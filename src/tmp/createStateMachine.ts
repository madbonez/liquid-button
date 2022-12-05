export type MachineState = 'ENTERED' | 'INSIDE' | 'OUTSIDE';
export type Actions = 'entered' | 'inside' | 'outside';

export const createStateMachine = (callback) => ({
    state: 'OUTSIDE',
    lastState: 'OUTSIDE',
    transitions: {
        ENTERED: {
            inside() {
                this.state = 'INSIDE'
            },
            outside() {
                this.state = 'OUTSIDE'
            },
        },
        INSIDE: {
            entered() {
                this.state = 'ENTERED'
            },
            outside() {
                this.state = 'OUTSIDE'
            }
        },
        OUTSIDE: {
            entered() {
                this.state = 'ENTERED'
            },
            inside() {
                this.state = 'INSIDE'
            },
        },
    },
    dispatch(actionName: Actions, pointerX: number, pointerY: number) {
        const action = this.transitions[this.state][actionName];
        if (action) {
            this.lastState = this.state;
            action.call(this);
            callback(this.state, this.lastState, pointerX, pointerY);
        }
    }
} as {
    lastState: MachineState,
    state: MachineState,
    dispatch: (action: Actions, pointerX: number, pointerY: number) => void,
})
