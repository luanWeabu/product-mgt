import {
  Button,
  Dialog,
  DialogBody,
  DialogFooter,
  DialogHeader,
  Input,
  Textarea,
  Typography,
} from "@material-tailwind/react";
import { useEffect, useState } from "react";
import { publicAxios } from "../http/instances";
import API_ENDPOINT from "../constants/api-endpoint";

export const ProductDialog = ({ open, onClose, productId }) => {
  const [file, setFile] = useState();
  const [productInit, setProductInit] = useState({
    name: "",
    description: "",
    price: 0,
  });

  useEffect(() => {
    if (productId) {
      setProductInit((prev) => ({
        ...prev,
        name: productId.name,
        description: productId.description,
        price: productId.price,
      }));
    } else {
      setProductInit((prev) => ({
        ...prev,
        name: "",
        description: "",
        price: 0,
      }));
    }
  }, [productId]);

  const handleFile = (e) => {
    setFile(e.target.files[0]);
  };

  const handleName = (e) => {
    const { value } = e.target;
    setProductInit((preProductInit) => ({
      ...preProductInit,
      name: value,
    }));
  };
  const handlePrice = (e) => {
    const { value } = e.target;
    setProductInit((preProductInit) => ({
      ...preProductInit,
      price: value,
    }));
  };
  const handleDescription = (e) => {
    const { value } = e.target;
    setProductInit((preProductInit) => ({
      ...preProductInit,
      description: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formdata = new FormData();
    formdata.append("image", file);

    try {
      const responce = await publicAxios.post(
        API_ENDPOINT.UPLOAD_FILE,
        formdata,
        { headers: { "Content-Type": "multipart/form-data" } }
      );
      const fileName = responce.data.filename;
      if (productId) {
        handleProductUpdate(fileName);
      } else {
        handleProductCreate(fileName);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleProductCreate = async (fileName) => {
    try {
      await publicAxios.post(API_ENDPOINT.PRODUCT, {
        name: productInit.name,
        image_path: fileName,
        description: productInit.description,
        price: productInit.price,
      });
      onClose();
    } catch (error) {
      console.error("Error creating product", error);
    }
  };

  const handleProductUpdate = async (fileName) => {
    try {
      if (productId) {
        const id = productId.id;
        await publicAxios.put(`${API_ENDPOINT.PRODUCT}/${id}`, {
          name: productInit.name,
          description: productInit.description,
          price: productInit.price,
          image_path: fileName,
        });
        onClose();
      }
    } catch (error) {
      console.error("Error updating product", error);
    }
  };

  return (
    <Dialog open={open} handler={onClose}>
      <DialogHeader>
        {productId ? "Edit Product" : "Create Product"}
      </DialogHeader>
      <DialogBody className=" flex justify-center">
        <form
          className="mt-8 mb-2 w-80 max-w-screen-lg sm:w-96"
          onSubmit={handleSubmit}
        >
          <div className="mb-1 flex flex-col gap-6">
            <Typography variant="h6" color="blue-gray" className="-mb-3">
              Name
            </Typography>
            <Input
              size="lg"
              type="text"
              className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
              labelProps={{
                className: "before:content-none after:content-none",
              }}
              value={productInit.name}
              onChange={handleName}
              required
            />
            <Typography variant="h6" color="blue-gray" className="-mb-3">
              Description
            </Typography>
            <Textarea
              size="lg"
              className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
              labelProps={{
                className: "before:content-none after:content-none",
              }}
              value={productInit.description}
              onChange={handleDescription}
              required
            />
            <Typography variant="h6" color="blue-gray" className="-mb-3">
              Price
            </Typography>
            <Input
              type="number"
              size="lg"
              className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
              labelProps={{
                className: "before:content-none after:content-none",
              }}
              value={productInit.price}
              onChange={handlePrice}
              required
            />
            <Typography variant="h6" color="blue-gray" className="-mb-3">
              Image
            </Typography>
            <Input
              type="file"
              size="lg"
              className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
              labelProps={{
                className: "before:content-none after:content-none",
              }}
              onChange={handleFile}
            />
          </div>
          <DialogFooter>
            <Button
              variant="text"
              color="red"
              className="mr-1"
              onClick={onClose}
            >
              <span>Cancel</span>
            </Button>
            <Button variant="gradient" color="green" type="submit">
              <span>{productId ? "Save" : "Create"} </span>
            </Button>
          </DialogFooter>
        </form>
      </DialogBody>
    </Dialog>
  );
};
