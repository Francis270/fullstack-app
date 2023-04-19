import { z } from 'zod';

export const RoleSchema = z.enum(['ADMIN','USER'], {
    errorMap: (issue, _ctx) => {
        switch (issue.code) {
            default:
                return { message: 'Invalid role.' }
        }
    }
});
export type RoleType = `${z.infer<typeof RoleSchema>}`;

export const RegisterSchema = z.object({
    username: z.string().min(4, { message: "Username must be at least 4 characters." }).max(48, { message: "Username must be shorter than 48 characters." }),
    password: z.string().min(4, { message: "Password must be at least 4 characters." }).max(48, { message: "Password must be shorter than 48 characters." }),
    role: RoleSchema
});