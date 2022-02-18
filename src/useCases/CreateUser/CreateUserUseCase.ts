import { User } from "../../entities/User";
import { IMailProvider } from "../../providers/IMailProvider";
import { IUsersRepository } from "../../repositories/IUsersRepository";
import { ICreateUserRequestDTO } from "./CreateUserDTO";

// Single Responsiblity Principle (Princípio da responsabilidade única)
export class CreateUserUseCase {

  // inversão de dependência
  constructor(
    private usersRepository: IUsersRepository,
    private mailProvider: IMailProvider
  ){}
  // regras de negócio
  async execute(data: ICreateUserRequestDTO) {
    const userAlreadyExists = await this.usersRepository.findByEmail(data.email);

    if(userAlreadyExists) {
      throw new Error("User already exists.");
    }

    const user = new User(data);

    await this.usersRepository.save(user);

    await this.mailProvider.sendMail({
      to: {
        name: data.name,
        email: data.email,
      },
      from: {
        name:"Equipe do Meu App",
        email: "equipe@meuapp.com.br",
      },
      subject: "Seja bem-vindo à plataforma",
      body: "<p>Você já poder fazer login na nossa plataforma.</p>"
    });
  }
}