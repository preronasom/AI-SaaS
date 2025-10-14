import { clerkClient, getAuth } from "@clerk/express";

export const auth = async (req, res, next) => {
    try {
        const { userId } = getAuth(req); // ✅ use getAuth
        if (!userId) {
            return res.status(403).json({ success: false, message: "Not authenticated" });
        }

        const user = await clerkClient.users.getUser(userId);

        // Read plan from Clerk's private metadata
        const userPlan = user.privateMetadata.plan || "free";

        if (userPlan === "free" && user.privateMetadata.free_usage !== undefined) {
            req.free_usage = user.privateMetadata.free_usage;
        } else {
            await clerkClient.users.updateUserMetadata(userId, {
                privateMetadata: { free_usage: 0 },
            });
            req.free_usage = 0;
        }

        req.plan = userPlan;
        next();
    } catch (error) {
        res.status(403).json({ success: false, message: "Authentication failed", error: error.message });
    }
};
