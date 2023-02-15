import { isSettingCandidateToUser } from './../../interactors/setting';
import { preventOrganizationToSettingWrongType } from './../../guards/organization_to_setting';
import { InternalCodes } from './../../constants/codes';
import { addOrganizationToSetting, deleteOrganizationToSetting, isOrganizationToSettingExists, updateOrganizationToSettingState } from './../../interactors/organization_to_setting';
import { Router, Request, Response } from 'express';

import { getUser, getUserSettings, getUsersSettings } from '../../interactors/user';
import { getOrganizationSettings } from '../../interactors/organization';
import { RequestAccessToken } from '../../interfaces/express/request';
import { User } from './../../interfaces/user';
import { StatusCodes } from '../../constants/codes';
import { SettingGroupTypes } from '../../constants/setting';

const router: Router = Router();

router.get('/user', async (req: Request, res: Response) => {
    const current_user = (req as RequestAccessToken).current_user
    let user: User | null = null
    try {
        user = await getUser(current_user.id)
    } catch(err) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send({
            message: 'An error occurred when getting user',
            code: 'GET_USERS_SETTINGS_ERROR'
        })
    }

    //TODO GET SETTINGS FROM ORGANIZATION THAT MATCH USER GROUP OR DO NOT SURPASS RANK (SYSADMIN(SYSADMIN, MANAGER, CLINICIA), MANAGER(MANAGER, CLINICIAN), CLINICIAN(CLINICIAN))
    try {
        const usersSettings = await getUsersSettings(user.organization_id)
        return res.status(StatusCodes.OK).send(usersSettings)
    } catch (err) {
        console.log(err)
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send({
            message: 'An error occurred when getting user settings',
            code: 'GET_USERS_SETTINGS_ERROR'
        })
    }
});

router.get('/user/:id', async (req: Request, res: Response) => {
    const current_user = (req as RequestAccessToken).current_user
    const userId = req.params.id
    
    let user: User | null = null
    try {
        user = await getUser(current_user.id)
    } catch(err) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send({
            message: 'An error occurred when getting user',
            code: 'GET_USER_SETTINGS_ERROR'
        })
    }

    //TODO GET SETTINGS FROM ORGANIZATION THAT MATCH USER GROUP OR DO NOT SURPASS RANK (SYSADMIN(SYSADMIN, MANAGER, CLINICIA), MANAGER(MANAGER, CLINICIAN), CLINICIAN(CLINICIAN))
    try {
        const userSettings = await getUserSettings(user.organization_id, userId)
        return res.status(StatusCodes.OK).send(userSettings)
    } catch (err) {
        console.log(err)
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send({
            message: 'An error occurred when getting user settings',
            code: 'GET_USER_SETTINGS_ERROR'
        })
    }
});

router.get('/organization', async (req: Request, res: Response) => {
    const current_user = (req as RequestAccessToken).current_user
    let user: User | null = null
    try {
        user = await getUser(current_user.id)
    } catch(err) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send({
            message: 'An error occurred when getting user',
            code: 'GET_ORGANIZATION_SETTINGS_ERROR'
        })
    }

    try {
        const organizationSettings = await getOrganizationSettings(user.organization_id)
        res.status(StatusCodes.OK).send(organizationSettings)
    } catch(err) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send({
            message: 'An error occurred when getting organization settings',
            code: 'GET_ORGANIZATION_SETTINGS_ERROR'
        })
    }


});

router.post('/', async (req: Request, res: Response) => {
    const {setting_id, organization_id, user_id, type} = req.body

    try {
        preventOrganizationToSettingWrongType(user_id, type)
    } catch(err) {
        return res.status(StatusCodes.UNPROCESSABLE_ENTITY).send({
            message: 'Type cant be USER if user_id is null and cant be ORGANIZATION if user_id is not null',
            code: 'ADD_USER_SETTINGS_ERROR'
        })
    }
    if(user_id){
        try {
            const isSettingCandidate = isSettingCandidateToUser(setting_id, user_id)
            if(!isSettingCandidate){
                return res.status(StatusCodes.UNPROCESSABLE_ENTITY).send({
                    message: 'Cant assing a setting to an user with inferior group rank',
                    code: 'ADD_USER_SETTINGS_ERROR'
                })
            }
        } catch(err) {
            return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send({
                message: 'An error ocurred when checking if setting can be assigned to user',
                code: 'ADD_USER_SETTINGS_ERROR'
            })
        }
    }
    
    try{
        const isSettingToOrganizationExistent = await isOrganizationToSettingExists( 
            setting_id, 
            organization_id,
            user_id,
            type
        )
        if(isSettingToOrganizationExistent){
            return res.status(StatusCodes.UNPROCESSABLE_ENTITY).send({
                message: 'Setting already exists in organization or user',
                code: InternalCodes.ORGANIZATION_TO_SETTING_DUPLICATED
            })
        }
    } catch(err){
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send({
            message: 'An error occurred when checking if setting already exists in organization or user',
            code: 'ADD_USER_SETTINGS_ERROR'
        })
    }

    try {
        await addOrganizationToSetting(
            setting_id, 
            organization_id,
            user_id,
            type 
        )
        return res.status(201).send()
    } catch(err) {
        return res.status(500).send({
            message: 'An error occurred when adding user settings',
            code: 'ADD_USER_SETTINGS_ERROR'
        })
    }
});

router.put('/user/:id', async (req: Request, res: Response) => {
    const {setting_id, state} = req.body
    const userId = req.params.id
    
    let user: User | null = null
    try {
        user = await getUser(userId)
    } catch(err) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send({
            message: 'An error occurred when getting user',
            code: 'UPDATE_USER_SETTINGS_ERROR'
        })
    }

    try {
        await updateOrganizationToSettingState(setting_id, userId, SettingGroupTypes.USER, state)
        return res.status(StatusCodes.OK).send()
    } catch(err) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send({
            message: 'An error occurred when updating user setting',
            code: 'UPDATE_USER_SETTINGS_ERROR'
        })
    }
})

router.put('/organization', async (req: Request, res: Response) => {
    const current_user = (req as RequestAccessToken).current_user
    const { state } = req.body

    let user: User | null = null
    try {
        user = await getUser(current_user.id)
    } catch(err) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send({
            message: 'An error occurred when getting user',
            code: 'UPDATE_ORGANIZATION_SETTINGS_ERROR'
        })
    }

    try {
        //TODO ANALIZAR COMO INCLUIR UNA RELACION EN LAS SEARCH OPTIONS DEL UPDATE O USAR QUERY BUILDER
        await updateOrganizationToSettingState(null, user.organization_id, SettingGroupTypes.ORGANIZATION, state)
        return res.status(StatusCodes.OK).send()
    } catch(err) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send({
            message: 'An error occurred when updating user setting',
            code: 'UPDATE_ORGANIZATION_SETTINGS_ERROR'
        })
    }
})

//PARA USER Y ORGANIZATION
router.delete('/user/:id', async (req: Request, res: Response) => {
    const { setting_id } = req.body
    const userId = req.params.id
    try {
        await getUser(userId)
    } catch(err) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send({
            message: 'An error occurred when getting user',
            code: 'DELETE_USER_SETTINGS_ERROR'
        })
    }

    try {
        await deleteOrganizationToSetting(setting_id, userId, SettingGroupTypes.USER)
        return res.status(StatusCodes.OK).send()
    } catch(err) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send({
            message: 'An error occurred when deleting user setting',
            code: 'DELETE_USER_SETTINGS_ERROR'
        })
    }
})

router.delete('/organization', async (req: Request, res: Response) => {
    const current_user = (req as RequestAccessToken).current_user

    let user: User | null = null
    try {
        user = await getUser(current_user.id)
    } catch(err) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send({
            message: 'An error occurred when getting user',
            code: 'DELETE_ORGANIZATION_SETTINGS_ERROR'
        })
    }

    try {
        await deleteOrganizationToSetting(null, user.organization_id, SettingGroupTypes.ORGANIZATION)
        return res.status(StatusCodes.OK).send()
    } catch(err) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send({
            message: 'An error occurred when deleting user setting',
            code: 'DELETE_ORGANIZATION_SETTINGS_ERROR'
        })
    }
})
export default router