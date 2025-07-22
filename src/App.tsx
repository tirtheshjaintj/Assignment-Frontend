import { useEffect, useState } from "react";
import { Bounce, toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axiosInstance from "./config/axiosInstance";
import "primereact/resources/themes/lara-light-blue/theme.css";
import "primereact/resources/primereact.min.css";
import { motion } from "framer-motion";
import Skeleton from "./components/Skeleton";
import Table from "./components/Table";
import Topbar from "./components/Topbar";

export interface Artwork {
  id: number;
  title: string;
  place_of_origin: string;
  artist_display: string;
  inscriptions: string;
  date_start: number;
  date_end: number;
}

export default function App() {
  const [page, setPage] = useState<number>(1);
  const [totalPage, setTotalPage] = useState<number>(1);
  const [rows, setRows] = useState(12);
  const [data, setData] = useState<Artwork[]>([]);
  const [selectedRows, setSelectedRows] = useState<Artwork[]>([]);
  const [loading, setLoading] = useState<boolean>(true);


  const getData = async () => {
    setLoading(true);
    try {
      const response = await axiosInstance.get("/", {
        params: { page },
      });
      const data = response.data;
      setData(data.data);
      setRows(data.pagination.limit || 12);
      setTotalPage(data.pagination.total_pages || 1);
    } catch (error) {
      toast.error("Error while fetching data");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getData();
  }, [page]);


  return (
    <>
      <ToastContainer position="bottom-right" transition={Bounce} limit={1} autoClose={2000} />
      <motion.div
        className="relative flex justify-center items-center p-4 min-h-screen bg-gray-50"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
      >
        <div className="relative w-full max-w-7xl rounded-xl shadow-md bg-white p-4">
          <Topbar page={page} setPage={setPage} totalPage={totalPage} />
          {loading ? (
            <Skeleton />
          ) : (
            <Table data={data} rows={rows} selectedRows={selectedRows} setSelectedRows={setSelectedRows} />
          )}
        </div>
      </motion.div>
    </>
  );
}
