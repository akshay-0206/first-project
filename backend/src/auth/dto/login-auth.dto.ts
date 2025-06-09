import { IsNotEmpty, Matches } from 'class-validator';

export class LoginAuthDto {
  @IsNotEmpty({ message: 'Invalid email' })
  email: string;

  @Matches(
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
    {
      message:
        'Password must contain at least one uppercase letter, one lowercase letter, one number, one special character, and be at least 8 characters long.',
    },
  )
  password: string;
}
