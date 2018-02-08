import expect from 'expect';

export default function(plugin, change) {
    const cursorBlock = change.state.document.getDescendant('anchor');
    change.moveToRangeOf(cursorBlock);

    const initialPosition = plugin.utils.getPosition(change.state);

    plugin.onKeyDown(
        {
            key: 'Tab',
            preventDefault() {},
            stopPropagation() {}
        },
        null,
        change
    );

    const position = plugin.utils.getPosition(change.state);

    // Same row
    expect(position.getRowIndex()).toEqual(initialPosition.getRowIndex());
    // Moved to next column
    expect(position.getColumnIndex()).toEqual(
        initialPosition.getColumnIndex() + 1
    );

    return change;
}
