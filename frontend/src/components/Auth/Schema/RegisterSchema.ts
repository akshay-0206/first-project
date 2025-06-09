import z from 'zod';

export const SignupSchema = z.object({
  name: z.string().min(2, "Name is required"),
  email: z.string().email("Email is required"),
  password: z.string().regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/),
  phone: z.string().regex(/^\d{10}$/, "Phone number must be exactly 10 digits"),
});

export type SignupData = z.infer<typeof SignupSchema>;