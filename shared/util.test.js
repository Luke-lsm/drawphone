import { getNewTurnLimit } from "./util.js";

const setNewTurnLimit = (state, modifier) => {
    const { currentTurnLimit, numPlayers, prevNumPlayers, isWordFirst } = state;
    const result = getNewTurnLimit({
        modifier,
        prevTurnLimit: currentTurnLimit,
        numPlayers,
        prevNumPlayers,
        isWordFirst,
    });

    state.currentTurnLimit = result.newTurnLimit;
};

test("getNewTurnLimit sticks to max", () => {
    let state = {
        currentTurnLimit: 4,
        numPlayers: 5,
        prevNumPlayers: 5,
        isWordFirst: false,
    };

    setNewTurnLimit(state, 0);
    expect(state.currentTurnLimit).toBe(4);

    state.prevNumPlayers = state.numPlayers;
    state.numPlayers++;
    setNewTurnLimit(state, 0);
    expect(state.currentTurnLimit).toBe(6);

    state.prevNumPlayers = state.numPlayers;
    state.numPlayers++;
    setNewTurnLimit(state, 0);
    expect(state.currentTurnLimit).toBe(6);

    state.prevNumPlayers = state.numPlayers;
    state.numPlayers++;
    setNewTurnLimit(state, 0);
    expect(state.currentTurnLimit).toBe(8);

    state.prevNumPlayers = state.numPlayers;
    state.numPlayers++;
    setNewTurnLimit(state, 0);
    expect(state.currentTurnLimit).toBe(8);
});

test("getNewTurnLimit stays at selected if below max", () => {
    let state = {
        currentTurnLimit: 4,
        numPlayers: 5,
        isWordFirst: false,
    };

    setNewTurnLimit(state, 0);
    expect(state.currentTurnLimit).toBe(4);

    state.prevNumPlayers = state.numPlayers;
    state.numPlayers = 6;
    setNewTurnLimit(state, 0);
    expect(state.currentTurnLimit).toBe(6);

    setNewTurnLimit(state, -1);
    expect(state.currentTurnLimit).toBe(4);

    state.prevNumPlayers = state.numPlayers;
    state.numPlayers = 7;
    setNewTurnLimit(state, 0);
    expect(state.currentTurnLimit).toBe(4);

    state.prevNumPlayers = state.numPlayers;
    state.numPlayers = 8;
    setNewTurnLimit(state, 0);
    expect(state.currentTurnLimit).toBe(4);

    state.prevNumPlayers = state.numPlayers;
    state.numPlayers = 9;
    setNewTurnLimit(state, 0);
    expect(state.currentTurnLimit).toBe(4);
});

test("getNewTurnLimit works with word first", () => {
    let state = {
        currentTurnLimit: 4,
        numPlayers: 4,
        isWordFirst: false,
    };

    setNewTurnLimit(state, 0);
    expect(state.currentTurnLimit).toBe(4);

    state.isWordFirst = true;
    setNewTurnLimit(state, 0);
    expect(state.currentTurnLimit).toBe(3);

    state.prevNumPlayers = state.numPlayers;
    state.numPlayers = 5;
    setNewTurnLimit(state, 0);
    expect(state.currentTurnLimit).toBe(5);

    state.prevNumPlayers = state.numPlayers;
    state.numPlayers = 6;
    setNewTurnLimit(state, 0);
    expect(state.currentTurnLimit).toBe(5);

    state.prevNumPlayers = state.numPlayers;
    state.numPlayers = 7;
    setNewTurnLimit(state, 0);
    expect(state.currentTurnLimit).toBe(7);

    state.prevNumPlayers = state.numPlayers;
    state.numPlayers = 8;
    setNewTurnLimit(state, 0);
    expect(state.currentTurnLimit).toBe(7);

    state.isWordFirst = false;
    setNewTurnLimit(state, 0);
    expect(state.currentTurnLimit).toBe(8);
});

test.skip("getNewTurnLimit debug test", () => {
    getNewTurnLimit({
        modifier: 0,
        prevTurnLimit: 4,
        numPlayers: 6,
        prevNumPlayers: 5,
        isWordFirst: false,
    });
});