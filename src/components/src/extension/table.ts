import Table from '@tiptap/extension-table'

import TableHeader from '@tiptap/extension-table-header'
import TableRow from '@tiptap/extension-table-row'

import TableCell from '@tiptap/extension-table-cell'
/* Table */
const CustomTableCell = TableCell.extend({
  addAttributes() {
    return {
      // extend the existing attributes …
      ...this.parent?.(),

      // and add a new one …
      backgroundColor: {
        default: null,
        parseHTML: element => element.getAttribute('data-background-color'),
        renderHTML: (attributes: Record<string, any>) => {
          return {
            'data-background-color': attributes.backgroundColor,
            'style': `background-color: ${attributes.backgroundColor}`,
          }
        },
      },
    }
  },
})
export default [
  Table,
  TableHeader,
  TableRow,
  CustomTableCell,
]
