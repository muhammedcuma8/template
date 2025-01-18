import { useState, useEffect } from "react";

interface DataItem {
  id: number;
  [key: string]: any;
}

interface UseJsonDataOptions {
  apiUrl: string;
}

interface JsonDataOperations {
  data: DataItem[];
  newData: DataItem | null;
  deletedItemId: number | null;
  fetchData: () => void;
  updateData: (id: number, newData: Partial<DataItem>) => void;
  insertData: (newItem: DataItem) => void;
  deleteData: (id: number) => void;
}

const useJsonData = ({ apiUrl }: UseJsonDataOptions): JsonDataOperations => {
  const [data, setData] = useState<DataItem[]>([]);
  const [newData] = useState<DataItem | null>(null);
  const [deletedItemId] = useState<number | null>(null);

  useEffect(() => {
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const fetchData = async () => {
    try {
      const response = await fetch(apiUrl);
      const jsonData = await response.json();
      setData(jsonData);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const updateData = (id: number, newData: Partial<DataItem>) => {
    const updatedData = data.map((item) => {
      if (item.id === id) {
        return { ...item, ...newData };
      }
      return item;
    });
    setData(updatedData);
    saveDataToFile(updatedData);
  };

  const insertData = (newItem: DataItem) => {
    const updatedData = [...data, newItem];
    setData(updatedData);
    saveDataToFile(updatedData);
  };

  const deleteData = (id: number) => {
    const updatedData = data.filter((item) => item.id !== id);
    setData(updatedData);
    saveDataToFile(updatedData);
  };

  const saveDataToFile = async (dataToSave: DataItem[]) => {
    try {
      const response = await fetch(apiUrl, {
        method: "PUT", // or 'POST' if you want to create new file
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(dataToSave),
      });
      if (!response.ok) {
        console.error("Failed to save data:", response.statusText);
      }
    } catch (error) {
      console.error("Error saving data:", error);
    }
  };

  return {
    data,
    newData,
    deletedItemId,
    fetchData,
    updateData,
    insertData,
    deleteData,
  };
};

export default useJsonData;
