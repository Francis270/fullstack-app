import { z } from 'zod';

require('dotenv').config();

const EnvVariablesSchema = z.object({
    PORT: z.coerce.number().min(0).default(5000),
    NODE_ENV: z.enum(['development', 'test', 'production']).default('development'),
    DATABASE_URL: z.string().url(),
    SECRET_KEY: z.string().min(6).max(255).default('secret'),
    SALT_ROUNDS: z.coerce.number().min(1).max(48).default(8),
    TOKEN_EXPIRING_TIME: z.string().default('1 day'),
    ADMIN_DEFAULT_PASSWORD: z.string().min(5).max(255).default('admin'),
});

export type EnvVariables = z.infer<typeof EnvVariablesSchema>;

let env: EnvVariables;

if (!!process.env.SKIP_ENV_VALIDATION === false) {
    const parsed = EnvVariablesSchema.safeParse(process.env);

    if (parsed.success === false) {
        throw new Error(`❌ Invalid environment variables:` + JSON.stringify(parsed.error.flatten()));
    }
    env = parsed.data;
}

declare global {
    namespace NodeJS {
        interface ProcessEnv extends z.infer<typeof EnvVariablesSchema> {}
    }
}

export { env };