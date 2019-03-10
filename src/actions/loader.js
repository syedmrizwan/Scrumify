export const LOADER_ACTIONS = {
    SHOW_LOADER: 'SHOW_LOADER'
}


export function showLoader(flag) {
    return {
        type: LOADER_ACTIONS.SHOW_LOADER,
        showloader: flag
    }
}

