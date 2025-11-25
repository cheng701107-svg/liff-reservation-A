export function middleware(req) {
  const auth = req.headers.get("authorization");

  const user = process.env.ADMIN_USER;
  const pass = process.env.ADMIN_PASS;

  if (!auth) {
    return new Response("需要登入", {
      status: 401,
      headers: { "WWW-Authenticate": 'Basic realm="Secure Area"' }
    });
  }

  const [scheme, encoded] = auth.split(" ");
  if (scheme !== "Basic") {
    return new Response("無效的授權方式", { status: 400 });
  }

  const decoded = atob(encoded);
  const [u, p] = decoded.split(":");

  if (u === user && p === pass) {
    return;
  }

  return new Response("帳密錯誤", {
    status: 401,
    headers: { "WWW-Authenticate": 'Basic realm="Secure Area"' }
  });
}

export const config = {
  matcher: "/admin.html"
};
