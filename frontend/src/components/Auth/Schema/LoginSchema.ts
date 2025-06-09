import z from 'zod';

export const LoginSchema = z.object({
  email: z.string().email("Email is required"),
  password: z.string().regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/),
});

export type LoginData = z.infer<typeof LoginSchema>;