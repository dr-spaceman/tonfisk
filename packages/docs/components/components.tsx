// Custom components/renderers to pass to MDX.
// Since the MDX files aren't loaded by webpack, they have no knowledge of how
// to handle import statements. Instead, you must include components in scope

import {
  atoms,
  Button,
  Card,
  Cell,
  Checkbox,
  Column,
  Item,
  MenuButton,
  Pagination,
  Provider,
  Row,
  Select,
  Spinner,
  Switch,
  Table,
  TableBody,
  TableCell,
  TableCheckboxCell,
  TableColumnHeader,
  TableHeader,
  TableHeaderRow,
  TableRow,
  TableRowGroup,
  TableSelectAllCell,
  Tag,
  TextInput,
  Tooltip,
} from "ds";
import Link from "next/link";
import { ReactElement, useState } from "react";

import Modal from "./Modal";

const SelectExample = (): ReactElement => {
  const items = [
    { key: 1, label: "One" },
    { key: 2, label: "Two" },
    { key: 3, label: "Three" },
  ];

  const [selected, setSelected] = useState(null);

  console.log(
    selected,
    items.find((item) => {
      console.log(item.key, selected);
      return item.key === selected;
    })
  );

  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      <div
        className={atoms({
          color: {
            lightMode: "gray-600",
            darkMode: "gray-400",
          },
          marginBottom: "m",
        })}
      >
        Selected:{" "}
        <code
          className={atoms({
            background: {
              lightMode: "gray-100",
              darkMode: "gray-700",
            },
            padding: "s",
            borderRadius: "4px",
          })}
        >
          {selected === null
            ? "None"
            : JSON.stringify(
                items.find((item) => item.key === selected),
                null,
                2
              )}
        </code>
      </div>
      <Select
        label="Select"
        onSelectionChange={(key) => setSelected(Number(key))}
      >
        {items.map((item) => (
          <Item key={item.key}>{item.label}</Item>
        ))}
      </Select>
    </div>
  );
};

const TableExample = (): ReactElement => {
  const [selectedKeys, setSelectedKeys] = useState([]);

  const columns = [
    { name: "Name", key: "name" },
    { name: "Type", key: "type" },
    { name: "Date Modified", key: "date" },
  ];

  const rows = [
    { id: 1, name: "Games", date: "6/7/2020", type: "File folder" },
    { id: 2, name: "Program Files", date: "4/7/2021", type: "File folder" },
    { id: 3, name: "bootmgr", date: "11/20/2010", type: "System file" },
    { id: 4, name: "log.txt", date: "1/18/2016", type: "Text Document" },
  ];

  return (
    <div>
      <div
        className={atoms({
          color: {
            lightMode: "gray-600",
            darkMode: "gray-400",
          },
          marginBottom: "m",
        })}
      >
        Selected:{" "}
        <code
          className={atoms({
            background: {
              lightMode: "gray-100",
              darkMode: "gray-700",
            },
            padding: "s",
            borderRadius: "4px",
          })}
        >
          {JSON.stringify(
            typeof selectedKeys === "string" ? selectedKeys : [...selectedKeys],
            null,
            2
          )}
        </code>
      </div>
      <Table
        aria-label="Example static collection table"
        selectionMode="multiple"
        onSelectionChange={(keys) => {
          console.log(keys);
          setSelectedKeys(keys);
        }}
      >
        <TableHeader columns={columns}>
          {(column) => <Column>{column.name}</Column>}
        </TableHeader>
        <TableBody items={rows}>
          {(item) => <Row>{(columnKey) => <Cell>{item[columnKey]}</Cell>}</Row>}
        </TableBody>
      </Table>
    </div>
  );
};

const MenuExample = (): ReactElement => {
  return (
    <MenuButton
      label="Actions"
      onAction={() => {
        console.log("Hej");
      }}
    >
      <Item key="copy">Copy</Item>
      <Item key="cut">Cut</Item>
      <Item key="paste">Paste</Item>
    </MenuButton>
  );
};

const CheckboxExample = (): ReactElement => {
  const [value, setValue] = useState(false);
  return (
    <div>
      <div
        className={atoms({
          color: {
            lightMode: "black",
            darkMode: "gray-200",
          },
          marginBottom: "m",
        })}
      >
        Value:{" "}
        <code
          className={atoms({
            background: {
              lightMode: "gray-100",
              darkMode: "gray-700",
            },
            padding: "s",
            borderRadius: "4px",
          })}
        >
          {JSON.stringify(value)}
        </code>
      </div>
      <Checkbox
        onChange={(next) => {
          setValue(next);
        }}
      >
        Label
      </Checkbox>
    </div>
  );
};

export const components = {
  a: ({ children, href }) => (
    <Link href={href}>
      <a href={href}>{children}</a>
    </Link>
  ),
  h1: ({ children }) => (
    <h1
      className={atoms({
        color: {
          lightMode: "black",
          darkMode: "gray-200",
        },
      })}
    >
      {children}
    </h1>
  ),
  h2: ({ children }) => (
    <h2
      className={atoms({
        color: {
          lightMode: "black",
          darkMode: "gray-200",
        },
      })}
    >
      {children}
    </h2>
  ),
  h3: ({ children }) => (
    <h3
      className={atoms({
        color: {
          lightMode: "black",
          darkMode: "gray-200",
        },
      })}
    >
      {children}
    </h3>
  ),
  h4: ({ children }) => (
    <h4
      className={atoms({
        color: {
          lightMode: "black",
          darkMode: "gray-200",
        },
      })}
    >
      {children}
    </h4>
  ),
  p: ({ children }) => (
    <p
      className={atoms({
        color: {
          lightMode: "gray-600",
          darkMode: "gray-400",
        },
      })}
    >
      {children}
    </p>
  ),
  pre: ({ children }) => (
    <pre
      className={atoms({
        padding: "l",
        borderRadius: "8px",
        border: {
          lightMode: "none",
          darkMode: "regularDark",
        },
        background: "gray-900",
        color: "gray-200",
      })}
    >
      {children}
    </pre>
  ),
  // code: ({ children }) => (
  //   <code
  //     className={atoms({
  //       background: {
  //         lightMode: "gray-100",
  //         darkMode: "gray-700",
  //       },
  //       padding: "s",
  //       borderRadius: "4px",
  //     })}
  //   >
  //     {children}
  //   </code>
  // ),
  Button,
  Checkbox,
  Card,
  Item,
  MenuButton,
  Pagination,
  Provider,
  Select,
  Spinner,
  Switch,
  Table,
  TableCell,
  TableColumnHeader,
  TableHeaderRow,
  TableRow,
  TableRowGroup,
  Tag,
  TextInput,
  Tooltip,
  Cell,
  Column,
  Row,
  TableBody,
  TableHeader,
  TableSelectAllCell,
  TableCheckboxCell,
  TableExample,
  SelectExample,
  MenuExample,
  ModalExample: Modal,
  CheckboxExample,
};
