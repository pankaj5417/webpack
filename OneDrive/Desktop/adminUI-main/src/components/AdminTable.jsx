import React, { useEffect, useState } from "react";
import {
  Table,
  Input,
  InputNumber,
  Popconfirm,
  Form,
  Typography,
  notification,
  Spin,
  Button,
} from "antd";
import axios from "../utility/api";
import { EditOutlined, DeleteTwoTone } from "@ant-design/icons";
import { GET_DATA_URL } from "../constantsData";
const { Search } = Input;

const originData = [];

const EditCell = ({
  editing,
  dataIndex,
  title,
  inputType,
  record,
  index,
  children,
  ...otherProps
}) => {
  const inputVal = inputType === "number" ? <InputNumber /> : <Input />;
  return (
    <td {...otherProps}>
      {editing ? (
        <Form.Item
          name={dataIndex}
          style={{
            margin: 0,
          }}
          rules={[
            {
              required: true,
              message: `Please Input ${title}!`,
            },
          ]}
        >
          {inputVal}
        </Form.Item>
      ) : (
        children
      )}
    </td>
  );
};

//Main admin table

const AdminTable = () => {
  const [form] = Form.useForm();
  let [data, setData] = useState(originData);
  const [editVal, setEditVal] = useState("");
  const [loading, setLoading] = useState(false);
  const [filter, setFilter] = useState("");
  const [selectedData, setSelectedData] = useState([]);
  const openNotification = (type, message) => {
    notification[type]({
      message: message,
    });
  };
  data =
    data &&
    data.filter((item) => {
      return Object.keys(item).some((key) =>
        item[key].toLowerCase().includes(filter.toLowerCase())
      );
    });

  const removeId = (id) => {
    data = data.filter((item) => {
      return item.id !== id;
    });
    setData(data);
  };

  //function to remove selected row

  const deleteSelectedItems = () => {
    const idArray = selectedData.map((e) => e.id);
    data = data.filter((item) => {
      return !idArray.includes(item.id);
    });
    setData(data);
    setSelectedData([]);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        let {data:dataItem }= await axios.get(GET_DATA_URL);
        dataItem = dataItem.map((item) => {
          var temp = Object.assign({}, item);
          temp.key = item.id;
          return temp;
        });
        setData(dataItem);
        setLoading(false);
      } catch (e) {
        setLoading(false);
        console.log(e);
        openNotification("error", e.message);
      }
    };
    fetchData();
  }, []);

  //function to edit any record

  const editItems = (record) => record.key === editVal;

  const edit = (record) => {
    form.setFieldsValue({
      name: "",
      email: "",
      role: "",
      ...record,
    });
    setEditVal(record.key);
  };

  const cancel = () => {
    setEditVal("");
  };

  const save = async (key) => {
    try {
      const row = await form.validateFields();
      const newData = [...data];
      const index = newData.findIndex((item) => key === item.key);

      if (index > -1) {
        const item = newData[index];
        newData.splice(index, 1, { ...item, ...row });
        setData(newData);
        setEditVal("");
      } else {
        newData.push(row);
        setData(newData);
        setEditVal("");
      }
    } catch (errInfo) {
      console.log("Validate Failed:", errInfo);
    }
  };

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      width: "50%",
      editable: true,
    },
    {
      title: "Email",
      dataIndex: "email",
      width: "50%",
      editable: true,
    },
    {
      title: "Role",
      dataIndex: "role",
      width: "50%",
      editable: true,
    },
    {
      title: "operation",
      dataIndex: "operation",
      className: "operation",
      width: "50%",
    
     render: (_, record) => {
        const editable = editItems(record);
        return (
          <>
            {editable ? (
              <span>
                <a
                  href="/#"
                  onClick={() => save(record.key)}
                  style={{
                    marginRight: 8,
                  }}
                >
                  Save
                </a>
                <Popconfirm title="Sure to cancel?" onConfirm={cancel}>
                  <a href="/#">Cancel</a>
                </Popconfirm>
              </span>
            ) : (
              <Typography.Link
                disabled={editVal !== ""}
                onClick={() => edit(record)}
              >
                <EditOutlined />
              </Typography.Link>
            )}
            <div className="delete-btn">
              <Typography.Link
                disabled={editVal !== ""}
                onClick={() => removeId(record.id)}
              >
                <DeleteTwoTone twoToneColor="#eb2f96" />
              </Typography.Link>
            </div>
          </>
        );
      },
    },
  ];

  const columnData = columns.map((col) => {
    if (!col.editable) {
      return col;
    }

    return {
      ...col,
      onCell: (record) => ({
        record,
        inputType: "text",
        dataIndex: col.dataIndex,
        title: col.title,
        editing: editItems(record),
      }),
    };
  });
  const rowSelection = {
    onChange: (selectedRowKeys, selectedRows) => {
      console.log(
        `selectedRowKeys: ${selectedRowKeys}`,
        "selectedRows: ",
        selectedRows
      );
      setSelectedData(selectedRows);
    },
  };

  //function to search record

  const searchItems = (e) => {
    setFilter(e.target.value);
  };
  if (loading) {
    return <Spin />;
  }
  return (
    <>
      <Search
        placeholder="Search by Name, Email or Role"
        onChange={searchItems}
        enterButton
      />
      <Form form={form} component={false}>
        <Table
          components={{
            body: {
              cell: EditCell,
            },
          }}
          rowSelection={{
            ...rowSelection,
          }}
          bordered
          dataSource={data}
          columns={columnData}
          rowClassName="editable-row"
          pagination={{
            onChange: cancel,
          }}
        />
      </Form>
      {selectedData.length > 0 && (
        <Button
          type="primary"
          danger
          className="delete-selected-btn"
          onClick={() => deleteSelectedItems()}
        >
          Delete Selected
        </Button>
      )}
    </>
  );
};

export default AdminTable;
