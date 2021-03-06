import type { User } from "./user";

import { withIronSessionApiRoute } from "iron-session/next";
import { sessionOptions } from "lib/session";
import { NextApiRequest, NextApiResponse } from "next";


export default withIronSessionApiRoute(loginRoute, sessionOptions);

async function loginRoute(req: NextApiRequest, res: NextApiResponse) {
    const { username } = await req.body;

    try {

        // get user from database then:
        const user = {
            id: 230,
            admin: true,
        } as User;
        req.session.user = user;
        await req.session.save();
        res.json(user);
    } catch (error) {
        res.status(500).json({ message: (error as Error).message });
    }
}