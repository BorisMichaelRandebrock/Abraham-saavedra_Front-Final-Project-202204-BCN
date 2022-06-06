import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useAppDispatch } from "../../redux/hooks";
import { createBeerThunk } from "../../redux/thunks/beerThunks";
import CreateEditBeerFormStyles from "./CreateEditBeerFormStyles";

const CreateEditBeerForm = (): JSX.Element => {
  const path = window.location;

  let initialFormValue = {
    name: "",
    brewery: "",
    style: "",
    degrees: "",
    IBU: "",
    country: "",
    description: "",
    image: "",
  };

  if (path.href.includes("editar-cerveza")) {
    initialFormValue = {
      name: "",
      brewery: "",
      style: "",
      degrees: "",
      IBU: "",
      country: "",
      description: "",
      image: "",
    };
  }

  const { id } = useParams();

  useEffect(() => {}, [id]);

  const dispatch = useAppDispatch();

  const [beerData, setBeerData] = useState(initialFormValue);
  const [file, setFile] = useState(false);

  useEffect(() => {
    if (beerData.image !== "") {
      setFile(true);
    }
  }, [beerData.image]);

  const changeBeerData = (event: React.ChangeEvent<HTMLInputElement>) => {
    setBeerData({
      ...beerData,
      [event.target.id]:
        event.target.type === "file"
          ? event.target.files![0]
          : event.target.value,
    });
  };

  const changeBeerDescription = (
    event: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    setBeerData({ ...beerData, [event.target.id]: event.target.value });
  };

  const submitForm = (event: React.SyntheticEvent) => {
    event.preventDefault();

    const newBeer = new FormData();
    newBeer.append("name", beerData.name);
    newBeer.append("brewery", beerData.brewery);
    newBeer.append("style", beerData.style);
    newBeer.append("degrees", beerData.degrees);
    newBeer.append("IBU", beerData.IBU);
    newBeer.append("country", beerData.country);
    newBeer.append("description", beerData.description);
    newBeer.append("image", beerData.image);

    dispatch(createBeerThunk(newBeer));
    setBeerData(initialFormValue);
    setFile(false);
  };

  return (
    <CreateEditBeerFormStyles
      noValidate
      autoComplete="off"
      onSubmit={submitForm}
    >
      <label htmlFor="name">Nombre de la cerveza</label>
      <input
        type="text"
        id="name"
        value={beerData.name}
        onChange={changeBeerData}
        placeholder="Nombre de la cerveza"
      />
      <label htmlFor="brewery">Fabricante</label>
      <input
        type="text"
        id="brewery"
        value={beerData.brewery}
        onChange={changeBeerData}
        placeholder="Fabricante"
      />
      <label htmlFor="style">Estilo</label>
      <input
        type="text"
        id="style"
        value={beerData.style}
        onChange={changeBeerData}
        placeholder="Estilo"
      />
      <div className="formulary-number-inputs">
        <label htmlFor="IBU">IBU</label>
        <input
          type="number"
          id="IBU"
          value={beerData.IBU}
          onChange={changeBeerData}
          placeholder="IBU"
          className="number-input"
        />
        <label htmlFor="degrees">Grados</label>
        <input
          type="number"
          id="degrees"
          value={beerData.degrees}
          onChange={changeBeerData}
          placeholder="Grados"
          className="number-input"
        />
      </div>
      <label htmlFor="country">País</label>
      <input
        type="text"
        id="country"
        value={beerData.country}
        onChange={changeBeerData}
        placeholder="País"
      />
      <label htmlFor="description">Descripción</label>
      <textarea
        id="description"
        value={beerData.description}
        onChange={changeBeerDescription}
        placeholder="Descripción"
      />
      <div className={file ? "fileUpload--On" : "fileUpload"}>
        <label htmlFor="country">Imagen</label>
        <input
          id="image"
          type="file"
          className="upload formulary--image-selector"
          required
          onChange={changeBeerData}
        />
        <span>Imagen</span>
      </div>
      <button>Crear cerveza</button>
    </CreateEditBeerFormStyles>
  );
};

export default CreateEditBeerForm;
