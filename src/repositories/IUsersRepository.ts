import { User } from "../entities/User";
// Liskov Substitution Principle (Princípio da substituição de Liskov)
export interface IUsersRepository {
  findByEmail(email: string): Promise<User>;
  save(user: User): Promise<void>;
}