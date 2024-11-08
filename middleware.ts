import {NextRequest, NextResponse} from 'next/server'
import {http} from "@/services";
import {Account, ApiResult} from "@/models";
import {NextURL} from "next/dist/server/web/next-url";

export const config = {
    matcher: [
        "/user-profile/:path",
    ]
}

 export async function middleware(request: NextRequest) {
    const token = request.cookies.get("auth_token")?.value;
    if (!token) {
        return NextResponse.redirect(new NextURL("/login", request.url));
    }
    const account = await getAccountByToken(token);
    if (!account) {
        return NextResponse.redirect(new NextURL("/login", request.url));
    }
}


const getAccountByToken = async (token:string) => {
    try {
        const url = "/Account/GetAccountByJwt";
        const res = await http().get<ApiResult<Account>>(url, {
            headers: {
                "Cookie": `auth_token=${token}`,
            }
        });
        return res.data.result;
    } catch (e) {
        console.log("ERROR", e);
    }
}


