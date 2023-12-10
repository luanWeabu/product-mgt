import { Button, IconButton } from "@material-tailwind/react";
import React, { useEffect, useState } from "react";
import { Card, Typography } from "@material-tailwind/react";
import { PencilSquareIcon, TrashIcon } from "@heroicons/react/24/solid";
import { ProductDialog } from "../components/ProductDialog";
import { publicAxios } from "../http/instances";
import API_ENDPOINT from "../constants/api-endpoint";

const tableRow = [
  { id: 1, title: "Name" },
  { id: 2, title: "Image" },
  { id: 3, title: "Description" },
  { id: 4, title: "Price" },
  { id: 5, title: "CreateAt" },
  { id: 6, title: "UpdateAt" },
  { id: 7, title: "" },
  { id: 8, title: "" },
];

export default function Products() {
  const [products, setProducts] = useState([]);
  const [productId, setProductId] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);

  const handleOpen = (productId) => {
    if (productId !== null) {
      const itemProduct = products.find((product) => product.id === productId);
      setProductId(itemProduct);
      setOpenDialog(true);
    }
  };

  const handleClose = () => {
    setProductId(null);
    setOpenDialog(!openDialog);
    fetchProducts();
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await publicAxios.get(API_ENDPOINT.PRODUCT);
      const productsData = response.data;
      setProducts(productsData);
    } catch (error) {
      console.error(error);
    }
  };

  const handleDelete = async (productId) => {
    try {
      await publicAxios.delete(`${API_ENDPOINT.PRODUCT}/${productId}`);
      fetchProducts();
    } catch (error) {
      console.error("Error deleting product", error);
    }
  };

  return (
    <div className="pt-10">
      <Typography variant="h1">Product</Typography>
      <Button onClick={handleOpen}>Create Product</Button>
      <div>
        <Card className="h-full w-[65vw] overflow-scroll lg:mt-5">
          <table className="w-full table-auto text-left">
            <thead>
              <tr>
                {tableRow.map((item) => (
                  <th
                    key={item.id}
                    className="border-b border-blue-gray-100 bg-blue-gray-50 p-4"
                  >
                    <Typography
                      variant="small"
                      color="blue-gray"
                      className="font-normal leading-none opacity-70"
                    >
                      {item.title}
                    </Typography>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {products.map((product, index) => {
                const isLast = index === tableRow.length - 1;
                const classes = isLast
                  ? "p-4"
                  : "p-4 border-b border-blue-gray-50";

                return (
                  <tr key={product.id}>
                    <td className={classes}>
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-normal"
                      >
                        {product.name}
                      </Typography>
                    </td>
                    <td className={classes}>
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-normal"
                      >
                        <img
                          src={`http://localhost:5000/images/${product.image_path}`}
                          alt=""
                          className="w-6 h-6"
                        />
                      </Typography>
                    </td>
                    <td className={classes}>
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-normal"
                      >
                        {product.description}
                      </Typography>
                    </td>
                    <td className={classes}>
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-normal"
                      >
                        {product.price}
                      </Typography>
                    </td>
                    <td className={classes}>
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-normal"
                      >
                        {product.createAt}
                      </Typography>
                    </td>
                    <td className={classes}>
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-normal"
                      >
                        {product.updateAt}
                      </Typography>
                    </td>
                    <td className={classes}>
                      <Typography
                        as="a"
                        href="#"
                        variant="small"
                        color="blue-gray"
                        className="font-medium"
                      >
                        <IconButton
                          variant="text"
                          className="rounded-full"
                          onClick={() => handleOpen(product.id)}
                        >
                          <PencilSquareIcon className="h-6 w-6 text-gray-500" />
                        </IconButton>
                      </Typography>
                    </td>
                    <td className={classes}>
                      <Typography
                        as="a"
                        href="#"
                        variant="small"
                        color="blue-gray"
                        className="font-medium"
                      >
                        <IconButton
                          variant="text"
                          className="rounded-full"
                          onClick={() => handleDelete(product.id)}
                        >
                          <TrashIcon className="h-6 w-6 text-red-500" />
                        </IconButton>
                      </Typography>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </Card>
      </div>
      <div>
        <ProductDialog
          open={openDialog}
          onClose={handleClose}
          productId={productId}
        />
      </div>
    </div>
  );
}
