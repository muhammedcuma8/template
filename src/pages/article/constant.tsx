import {
  // createArticle,
  deleteArticle,
  getAllArticle,
  updateArticle,
} from "../../services/article/index.api";
import CustomStore from "devextreme/data/custom_store";
// import { ArticleCreate } from "../../services/article/index.model";
import { AxiosInstance } from "axios";
import { ColumnConfig } from "../../components/basic/ktnDataGrid";
export const getArticleStore = (showNotification: any, http: AxiosInstance) => {
  return new CustomStore({
    key: "id",
    loadMode: "raw",
    load: (load: any) => {
      console.log(load);
      return getAllArticle(http).then((response) => {
        console.log(response);
        return response.products;
      });
    },
    // insert: (values: ArticleCreate) => {
    //   return createArticle(values, http).then((response) => {
    //     showNotification({
    //       detail: response.message,
    //     });
    //   });
    // },
    update: function (key, values) {
      return updateArticle({ id: key, data: values }, http).then((response) => {
        showNotification({
          detail: response.message,
        });
      });
    },
    remove: function (key) {
      return deleteArticle(key, http).then((response) => {
        if (response.success) {
          showNotification({
            detail: response.message,
          });
        }
      });
    },
  });
};
export const columns: ColumnConfig[] = [
  {
    dataField: "id",
    dataType: "number",
    caption: "#ID",
    width: "auto",
    formItem: { visible: false },
  },
  {
    dataField: "title",
    width: "auto",
  },
  {
    dataField: "description",
  },
  {
    dataField: "created_at",
    dataType: "datetime",
    caption: "Created Date",
    alignment: "right",
    width: "auto",
    formItem: { visible: false },
  },
];
