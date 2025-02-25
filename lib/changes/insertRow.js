// @flow
import { type Editor, type Block } from 'slate';

import { TablePosition, createRow } from '../utils';
import type Options from '../options';

/**
 * Insert a new row in current table
 */
function insertRow(
    opts: Options,
    editor: Editor,
    at?: number, // row index
    getRow?: (columns: number) => Block // Generate the row yourself
) {
    const { value } = editor;

    const pos = TablePosition.create(
        opts,
        value.document,
        value.selection.start.key
    );
    const { table } = pos;

    // Create a new row with the right count of cells
    const columns = table.nodes.get(0).nodes.size;
    const newRow = getRow ? getRow(columns) : createRow(opts, columns);

    if (typeof at === 'undefined') {
        at = pos.getRowIndex() + 1;
    }

    return editor
        .insertNodeByKey(table.key, at, newRow)
        .moveToEndOfNode(newRow.nodes.get(pos.getColumnIndex()));
}

export default insertRow;
