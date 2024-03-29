import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import {
  createBeerThunk,
  updateBeerThunk,
} from "../../redux/thunks/beerThunks";
import { BeerDataApi } from "../../types/interfaces";
import CreateEditBeerFormStyles from "./CreateEditBeerFormStyles";

type BeerPropForm = {
  beer: BeerDataApi | null;
};

const CreateEditBeerForm = ({ beer }: BeerPropForm): JSX.Element => {
  const { singleBeer } = useAppSelector((state) => state.beer);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  let initialFormValue = {
    name: beer ? beer.name : "",
    brewery: beer ? beer.brewery : "",
    style: beer ? beer.style : "",
    degrees: beer ? beer.degrees : "",
    IBU: beer ? beer.IBU : "",
    country: beer ? beer.country : "",
    description: beer ? beer.description : "",
    image: beer ? beer.image : "",
  };

  const [beerData, setBeerData] = useState(initialFormValue);
  const [file, setFile] = useState(false);

  useEffect(() => {
    if (beerData.image !== "") {
      setFile(true);
    }
    if (beerData.image === null) {
      setFile(false);
    }
  }, [beerData.image, initialFormValue.image]);

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

    const newBeer: FormData | any = new FormData();
    newBeer.append("name", beerData.name);
    newBeer.append("brewery", beerData.brewery);
    newBeer.append("style", beerData.style);
    newBeer.append("degrees", beerData.degrees);
    newBeer.append("IBU", beerData.IBU);
    newBeer.append("country", beerData.country);
    newBeer.append("description", beerData.description);
    newBeer.append("image", beerData.image);

    if (beer) {
      dispatch(updateBeerThunk(newBeer, beer.id));
      setBeerData({
        name: "",
        brewery: "",
        style: "",
        degrees: 0,
        IBU: 0,
        country: "",
        description: "",
        image: "",
      });
      setFile(false);
      navigate(`/detalles-cerveza/${singleBeer.id}`);
    } else {
      dispatch(createBeerThunk(newBeer));
      setBeerData({
        name: "",
        brewery: "",
        style: "",
        degrees: 0,
        IBU: 0,
        country: "",
        description: "",
        image: "",
      });
      setFile(false);
      navigate(`/detalles-cerveza/${singleBeer.id}`);
    }
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
      {beer && (
        <div className="formulary--previus-image">
          <p>Imagen previa</p>
          <img
            src={beer.imageBackup}
            alt="imagen de la cerveza"
            width={60}
            height={125}
          />
        </div>
      )}
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
      {!beer && <button>Crear cerveza</button>}
      {beer && <button className="editing">Editar cerveza</button>}
    </CreateEditBeerFormStyles>
  );
};

export default CreateEditBeerForm;
