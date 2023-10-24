import { AppError } from "@providers/core/error/ApplicationError";
import { IDeleteRequestDTO, IDeleteResponseDTO } from "./IDeleteUser.DTO";
import { UserRepository } from "@repositories/user/User.Repository";
import { Report } from "@providers/core/error/ReportError.Provider";
import { StatusCode } from "@providers/core/error/ErrorTypes";
import { provide } from "inversify-binding-decorators";

@provide(DeleteUserUseCase)
class DeleteUserUseCase {

    constructor(private userRepository: UserRepository) { }

    async Execute(data: IDeleteRequestDTO): Promise<IDeleteResponseDTO | AppError> {
        const { id } = data;

        const userExist = await this.userRepository.FindById(id);

        if (!userExist) {
            const error: AppError = Report.Error(new AppError(
                StatusCode.BadRequest,
                "User not found"),
                "user-delete");
            return error;
        }

        const userDeleted = await this.userRepository.Delete(id);

        if (!userDeleted) {
            const error: AppError = Report.Error(new AppError(
                StatusCode.BadRequest,
                "User not deleted"),
                "user-delete");
            return error;
        }

        const userDataReturn: IDeleteResponseDTO = {
            id: userDeleted._id,
            name: userDeleted.name,
            email: userDeleted.email,
            status: "User deleted successfully"
        }

        return Promise.resolve(userDataReturn);
    }
}

export { DeleteUserUseCase };