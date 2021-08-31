import GroupViewModel from "../../viewmodel/group/GroupViewModel";

export interface GroupsState {
  isGroupsLoading: boolean;
  groupsError?: Error | null;
  groups?: GroupViewModel[] | null;

  isSelectedGroupLoading: boolean;
  selectedGroupError?: Error | null;
  selectedGroup?: GroupViewModel | null;

  isCreatingGroup: boolean;
  createGroupSuccess?: GroupViewModel | null;
  createGroupError?: Error | null;

  deleteGroupSuccess?: GroupViewModel | null;
  deleteGroupError?: Error | null
}

export const groupsInitialState: GroupsState = {
  isGroupsLoading: false,
  isSelectedGroupLoading: false,
  isCreatingGroup: false,
};

export const groupsLoadingState = (state: GroupsState): GroupsState => {
  state.isGroupsLoading = true;
  return state;
};

export const groupsSuccessState = (
  state: GroupsState,
  groups: GroupViewModel[]
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
  state.groupsError = error;
  return state;
};

export const selectedGroupLoadingState = (state: GroupsState): GroupsState => {
  state.isSelectedGroupLoading = true;
  return state;
};

export const selectedGroupSuccessState = (
  state: GroupsState,
  group: GroupViewModel
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

export const creatingGroupState = (
  state: GroupsState,
): GroupsState => {
  state.isCreatingGroup = true;
  return state;
};

export const createGroupSuccessState = (
  state: GroupsState,
  group: GroupViewModel
): GroupsState => {
  state.isCreatingGroup = false;
  state.createGroupSuccess = group;
  state.createGroupError = null;

  state.groups = [...state.groups!, group];

  return state;
};

export const createGroupErrorState = (
  state: GroupsState,
  error: Error
): GroupsState => {
  state.isCreatingGroup = false;
  state.createGroupSuccess = null;
  state.createGroupError = error;
  return state;
};

export const deleteGroupSuccessState = (
    state: GroupsState,
    group: GroupViewModel
): GroupsState => {
  console.log(group);

  state.deleteGroupSuccess = group;
  state.deleteGroupError = null;

  const index = state.groups?.findIndex((itr) => itr.id === group.id);
  if (index) {
    state.groups?.splice(index, 1);
  }

  return state;
};

export const deleteGroupErrorState = (
    state: GroupsState,
    error: Error
): GroupsState => {
  state.deleteGroupSuccess = null;
  state.deleteGroupError = error;
  return state;
};