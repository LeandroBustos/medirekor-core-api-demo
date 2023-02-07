import { v4 as uuidv4 } from 'uuid'

import { UserState } from "../constants/user"
import { UserCreationSerialize, UserCreation } from "../interfaces/user"
import { createPasswordProvisional } from "../utils/password"

export const serializeUserProvisionalCreation = (user: UserCreation ):UserCreationSerialize  => {
    const password: string = createPasswordProvisional()
    const id: string = uuidv4()
    return {
        ...user,
        id,
        password,
        state: UserState.PENDING
    }
}