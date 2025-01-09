
export function middleware(request) {
    const isExit = true;
    if (isExit) return;

    return Response.redirect(request.nextUrl);
}

export const config = {
    matcher: ['/((?!_next)(?!.*\\.(?:ico|png|gif|svg|jpg|jpeg|xml|txt|mp4)$)(?!/api).*)'],
};