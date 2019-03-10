export const SNACK_BARS_ACTIONS = {
    SHOW_SUCCESS_SNACK_BAR: 'SHOW_SUCCESS_SNACK_BAR',
    SHOW_ERROR_SNACK_BAR: 'SHOW_ERROR_SNACK_BAR'
}

export function showSuccessSnackBar(payload) {
    return {
        type: SNACK_BARS_ACTIONS.SHOW_SUCCESS_SNACK_BAR,
        succ_flag: payload.flag,
        succ_message: payload.message
    }
}

export function showErrorSnackBar(payload) {
    return {
        type: SNACK_BARS_ACTIONS.SHOW_ERROR_SNACK_BAR,
        err_flag: payload.flag,
        err_message: payload.message
    }
}