import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { Links } from 'parse-link-header'

import { getInvitesData } from 'api/Apis'
import { AppThunk } from 'app/store'


export interface Invite {
    email: any //"admin@gmail.com",
    intime: any //"2020-09-14 20:28:34",
    invite_id: any //"arj1600095514",
    mobileno: any //"123456789",
    name: any //"arjunp",
    purpose: any //"tomeet",
    scheduletime: any //"2020-09-12 15:00"
    tomeet: any //"arjun2"
}
export interface InvitesResult {
    //pageLinks: Links | null
    pageCount: number
    invites: Invite[]
}

interface InviteState {
    invites: Invite[]
    invitesById: Record<string, Invite>
    currentPageInvites: number[]
    pageCount: number
    pageLinks: Links | null
    isLoading: boolean
    error: string | null
}

const invitesInitialState: InviteState = {
    invites: [],
    invitesById: {},
    currentPageInvites: [],
    pageCount: 0,
    pageLinks: {},
    isLoading: false,
    error: null
}

function startLoading(state: InviteState) {
    state.isLoading = true
}

function loadingFailed(state: InviteState, action: PayloadAction<string>) {
    state.isLoading = false
    state.error = action.payload
}

const invites = createSlice({
    name: 'invites',
    initialState: invitesInitialState,
    reducers: {

        getInvitesStart: startLoading,
        getInvitesSuccess(state, { payload }: PayloadAction<InvitesResult>) {
            const { pageCount, invites } = payload
            state.pageCount = pageCount
            state.isLoading = false
            state.error = null
            state.invites = invites
            // @ts-ignore
            state.invites.map(invite => (state.invitesById[invite.invite_id]=invite))
        },
        getInvitesFailure: loadingFailed,
    }
})

export const {
    getInvitesStart,
    getInvitesSuccess,
    getInvitesFailure
} = invites.actions

export default invites.reducer

export const fetchInvites = (
    page?: number
): AppThunk => async dispatch => {
    try {
        dispatch(getInvitesStart())
        const invites = await getInvitesData()

        dispatch(getInvitesSuccess(invites))
    } catch (err) {
        dispatch(getInvitesFailure(err.toString()))
    }
}
