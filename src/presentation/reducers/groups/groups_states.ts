import { IGroup } from "../../../domain/entity/Group";

export interface GroupsState {
    isGroupsLoading: boolean;
    GroupsError?: Error | null;
    groups?: IGroup[] | null;
    isSelectedGroupLoading: boolean;
    selectedGroupError?: Error | null;
    selectedGroup?: IGroup | null;
}

export const groupsInitialState: GroupsState = {
    isGroupsLoading: false,
    isSelectedGroupLoading: false,
};

export const groupsLoadingState = (state: GroupsState): GroupsState => {
    state.isGroupsLoading = true;
    return state;
};

export const groupsSuccessState = (
    state: GroupsState,
    groups: IGroup[]
): GroupsState => {
    state.isGroupsLoading = false;
    state.groups = groups;
    return state;
};

export const groupsErrorState = (
    state: GroupsState,
    error: Error
): GroupsState => {
    state.isGroupsLoading = false;
    state.GroupsError = error;
    return state;
};

export const selectedGroupLoadingState = (state: GroupsState): GroupsState => {
    state.isSelectedGroupLoading = true;
    return state;
};

export const selectedGroupSuccessState = (
    state: GroupsState,
    group: IGroup
): GroupsState => {
    state.isSelectedGroupLoading = false;
    state.selectedGroup = group;
    return state;
};

export const selectedGroupErrorState = (
    state: GroupsState,
    error: Error
): GroupsState => {
    state.isSelectedGroupLoading = false;
    state.selectedGroupError = error;
    return state;
};