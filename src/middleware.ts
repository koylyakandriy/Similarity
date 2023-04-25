import { withAuth } from "next-auth/middleware";
import { NextApiRequest } from "next";
import { Redis } from "@upstash/redis";
import { NextRequest, NextResponse } from "next/server";
import { Ratelimit } from "@upstash/ratelimit";
import { getToken } from "next-auth/jwt";

const redis = new Redis({
  url: process.env.REDIS_URL,
  token: process.env.REDIS_SECRET,
});

const ratelimit = new Ratelimit({
  redis,
  limiter: Ratelimit.slidingWindow(5, "1 h"),
});

const middleware = async (req: NextRequest) => {
  const pathname = req.nextUrl.pathname;

  if (pathname.startsWith("/api ")) {
    const ip = req.ip ?? "172.0.0.1";

    try {
      const { success } = await ratelimit.limit(ip);

      if (!success) return NextResponse.json({ error: "Too many response" });
      return NextResponse.next();
    } catch (error) {
      return NextResponse.json({ error: "Internal Server Error" });
    }
  }

  const token = await getToken({ req });
  const isAuth = !!token;

  const isAuthPage = pathname.startsWith("/login");
  const sensitiveRouts = ["/dashboard"];

  if (isAuthPage) {
    if (isAuth) {
      return NextResponse.redirect(new URL("/dashboard", req.url));
    }

    return null;
  }

  if (!isAuth && sensitiveRouts.some((route) => pathname.startsWith(route))) {
    return NextResponse.redirect(new URL("/login", req.url));
  }
};

export default withAuth(middleware, {
  callbacks: {
    authorized() {
      return true;
    },
  },
});

export const config = {
  matcher: ["/", "/login", "/dashboard/:path*", "/api/:path*"],
};
