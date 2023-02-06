function classNames(...classes: any[]) {
    return classes.filter(Boolean).join(' ')
}

export const Table = ({
  tableData,
  tableHeadings
}: {
  tableData: any[];
  tableHeadings?: any[];
}) => {
    let _tableData = null;

    // If no table headings, generate them from unique keys in data
    if (!tableHeadings) tableHeadings = Object.values(tableData).reduce((acc: any, value: any) => {
        return Object.keys(value).map((key) => {
            return {
                value: key,
                count: null
            };
        })
    }, []);

    // Make sure the keys have the same index as the heading
    if (tableHeadings && tableHeadings.length > 0) {
        _tableData = tableData.map((rowItem) => {
            return tableHeadings?.reduce((acc, heading) => {
                return {
                    ...acc,
                    [heading.value]: rowItem[heading.value] ? rowItem[heading.value] : 'no data'
                }
            }, [])
        })
    }

    return (
        <table className="min-w-full border-separate" style={{ borderSpacing: 0 }}>
            <thead className="bg-gray-50">
        <tr>
          {tableHeadings &&
          tableHeadings.map((heading: any) => {
              return <th scope="col" className="sticky capitalize top-0 z-10 border-b border-gray-300 bg-gray-50 bg-opacity-75 py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 backdrop-blur backdrop-filter sm:pl-6 lg:pl-8" key={heading.value}>{heading.value}</th>;
            })}
        </tr>
      </thead>
      <tbody className="bg-white">
        {_tableData &&
        _tableData.map((rowItem: any, rowIdx: number) => {
              return <tr key={rowIdx}>
                  {Object.values(rowItem).map((colItem: any, colIdx: number) => {
                      return <td className={classNames(
                          colIdx !== rowItem.length - 1 ? 'border-b border-gray-200' : '',
                          'whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6 lg:pl-8'
                      )} key={colIdx}>{typeof colItem === 'object' ? 'ERR: TABLE DOES NOT ACCEPT OBJECTS' : colItem }</td>
                  })}
              </tr>
          })}
      </tbody>
    </table>
  );
};
