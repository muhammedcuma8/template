import React, { useState, useEffect, useRef } from "react";
import KTNDataTable from "../../basic/ktnDatatable";
import Button from "../../basic/ktnButton";
import { Toolbar } from "primereact/toolbar";
import {
  handleDataQuery,
  leftToolbarTemplate,
  rightToolbarTemplate,
} from "./constants";
import { EditDialog } from "./dialogs/edit";
import { AddDialog } from "./dialogs/add";
import { DeleteDialog } from "./dialogs/delete";
import { MultiDeleteDialog } from "./dialogs/multiDelete";
import ContainerAPI from "../containerAPI";
import { useNotifyContext } from "../../../contexts/notify";
import { PreviewDialog } from "./dialogs/preview";

export interface CRUDDataTableProps {
  http?: any;
  keyField: string;
  title?: string;
  add?: {
    columns: any[];
    mutition: any;
    extraHtml?: any;
  };
  multiDelete?: {
    mutition: any;
    extraHtml?: any;
  };
  view: {
    columns: any[];
    mutition: any;
    getData: any;
    extraHtml?: any;
    datakey?: any;
  };
  edit?: {
    columns: any[];
    mutition: any;
    extraHtml?: any;
  };
  delete?: {
    mutition: any;
    extraHtml?: any;
  };
  export?: boolean;
  permissions?: {
    canAdd: boolean;
    canEdit: boolean;
    canDelete: boolean;
    canExport: boolean;
  };
  labels?: any;
  apiPagination?: boolean;
  preview?: {
    columns: any;
  };
}

const CRUDDataTable = (props: CRUDDataTableProps) => {
  const [selected, setSelected] = useState<any>(null);
  const { showNotification } = useNotifyContext();
  const [globalFilter, setGlobalFilter] = useState<any>(null);
  const [editVisible, setEditVisible] = useState<boolean>(false);
  const [previewVisible, setPreviewVisible] = useState<boolean>(false);
  const [addVisible, setAddVisible] = useState<boolean>(false);
  const [deleteVisible, setDeleteVisible] = useState<boolean>(false);
  const [multiDeleteVisible, setMultiDeleteVisible] = useState<boolean>(false);
  const [editData, setEditData] = useState<any>(false);
  const [previewData, setPreviewData] = useState<any>(false);
  const [deleteData, setDeleteData] = useState<any>(false);
  const [data, setData] = useState<any>(null);
  const viewDataQuery = props.view.mutition;
  const allDataQuery = props.view.getData(props.http);
  console.log(allDataQuery.data);
  const dt = useRef<any>(null);
  useEffect(() => {
    handleDataQuery(
      allDataQuery,
      setData,
      showNotification,
      props.view.datakey
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [allDataQuery.status]);

  const actionBodyTemplate = (rowData: any) => {
    return (
      <div className="actions">
        {checkPreview() && (
          <Button
            icon="pi pi-eye"
            label={props.labels?.preview?.label || "Preview"}
            className="p-button-success mr-2 mb-2"
            onClick={() => {
              setPreviewData(rowData);
              setPreviewVisible(true);
            }}
          />
        )}
        {checkEdit() && (
          <Button
            icon="pi pi-pencil"
            label={props.labels?.edit.label || "Edit"}
            className="p-button-success mr-2 mb-2"
            onClick={() => {
              setEditData(rowData);
              setEditVisible(true);
            }}
          />
        )}
        {checkDelete() && (
          <Button
            label={props.labels?.delete.label || "Delete"}
            icon="pi pi-trash"
            className="p-button-danger mr-2 mb-2"
            onClick={() => {
              setDeleteData(rowData);
              setDeleteVisible(true);
            }}
          />
        )}
      </div>
    );
  };
  const checkEdit = () => {
    if (!props.edit) {
      return false;
    }
    if (props.permissions && props.permissions.canEdit) {
      return props.edit;
    }
    if (props.permissions && !props.permissions.canEdit) {
      return false;
    }
    return props.edit;
  };
  const checkAdd = () => {
    if (!props.add) {
      return false;
    }
    if (props.permissions && props.permissions.canAdd) {
      return props.add;
    }
    if (props.permissions && !props.permissions.canAdd) {
      return false;
    }
    return props.add;
  };
  const checkExport = () => {
    if (!props.export) {
      return false;
    }
    if (props.permissions && props.permissions.canExport) {
      return props.export;
    }
    if (props.permissions && !props.permissions.canExport) {
      return false;
    }
    return props.export;
  };
  const checkDelete = () => {
    if (!props.delete) {
      return false;
    }
    if (props.permissions && props.permissions.canDelete) {
      return props.delete;
    }
    if (props.permissions && !props.permissions.canDelete) {
      return false;
    }
    return props.delete;
  };
  const checkPreview = () => {
    if (!props.preview) {
      return false;
    }
    return props.preview;
  };
  const checkMultiDelete = () => {
    if (!props.delete) {
      return false;
    }
    if (props.permissions && props.permissions.canDelete) {
      return props.delete;
    }
    if (props.permissions && !props.permissions.canDelete) {
      return false;
    }
    if (!props.multiDelete) {
      return false;
    }
    return props.multiDelete;
  };

  const extraProps: any = {};

  if (checkEdit() || checkDelete() || checkPreview()) {
    if (!props.view.columns.some((column) => column.val === "actions")) {
      props.view.columns.push({
        val: "actions",
        body: actionBodyTemplate,
        header: props.labels?.actions?.label || "Actions",
      });
    }
  }
  if (props.apiPagination) {
    extraProps["apiPagination"] = {
      totalRecords: 159,
      rowsPerPageOptions: [10, 20, 30],
      onPageChange: (e: any) => {
        console.log(e);

        viewDataQuery.mutate({ http: props.http, pageNumber: e.page });
      },
    };
  }

  return (
    <ContainerAPI query={allDataQuery}>
      <div className="grid crud-demo">
        <div className="col-12">
          <div className="card">
            {
              <Toolbar
                className="mb-4"
                start={() =>
                  leftToolbarTemplate(
                    props,
                    () => {
                      setAddVisible(true);
                    },
                    // () => {
                    //   console.log("multi delete");
                    // },
                    //data for multi delete
                    selected,
                    () => {
                      setMultiDeleteVisible(true);
                    },
                    checkAdd,
                    checkMultiDelete
                    // checkPreview
                  )
                }
                end={() => rightToolbarTemplate(dt, checkExport, props)}
              ></Toolbar>
            }
            <KTNDataTable
              ref={dt}
              query={viewDataQuery}
              data={data}
              selectedProducts={selected}
              onSelectionChange={(e: any) => setSelected(e.value)}
              globalFilter={globalFilter}
              setGlobalFilter={setGlobalFilter}
              columns={props.view.columns}
              selectionMode={props.multiDelete ? "multiple" : "single"}
              dataKey={props.keyField}
              {...extraProps}
            />
            {checkPreview() && (
              <PreviewDialog
                visible={previewVisible}
                setVisible={setPreviewVisible}
                data={previewData}
                culomns={props.preview?.columns}
                labels={props.labels}
              />
            )}
            {checkEdit() && (
              <EditDialog
                visible={editVisible}
                setVisible={setEditVisible}
                savedata={(data: any) => {
                  props.edit?.mutition.mutate({
                    id: data.id,
                    data: data,
                    http: props.http,
                  });
                  console.log("save", data);
                }}
                data={editData}
                culomns={props.edit?.columns}
                query={props.edit?.mutition}
                extraHtml={props.edit?.extraHtml}
                setData={setData}
                labels={props.labels}
              />
            )}
            {checkAdd() && (
              <AddDialog
                visible={addVisible}
                setVisible={setAddVisible}
                savedata={(data: any) => {
                  props.add?.mutition.mutate({
                    data: data,
                    http: props.http,
                  });
                }}
                culomns={props.add?.columns}
                extraHtml={props.add?.extraHtml}
                query={props.add?.mutition}
                setData={setData}
                labels={props.labels}
              />
            )}
            {checkDelete() && (
              <DeleteDialog
                visible={deleteVisible}
                setVisible={setDeleteVisible}
                data={deleteData}
                savedata={() => {
                  console.log("delete", deleteData);
                  props.delete?.mutition.mutate({
                    data: deleteData,
                    http: props.http,
                  });
                }}
                setData={setData}
                extraHtml={props.delete?.extraHtml}
                query={props.delete?.mutition}
                labels={props.labels}
              />
            )}
            {checkMultiDelete() && (
              <MultiDeleteDialog
                visible={multiDeleteVisible}
                setVisible={setMultiDeleteVisible}
                data={deleteData}
                savedata={() => {
                  const ids = selected.map((item: any) => item.id);
                  props.multiDelete?.mutition.mutate({
                    ids: ids,
                    http: props.http,
                  });
                  console.log("delete", ids);
                }}
                query={props.multiDelete?.mutition}
                extraHtml={props.multiDelete?.extraHtml}
                labels={props.labels}
              />
            )}
          </div>
        </div>
      </div>
    </ContainerAPI>
  );
};

export default CRUDDataTable;
