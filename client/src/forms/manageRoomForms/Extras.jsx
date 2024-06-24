import React, { useState } from "react";
import { useFormContext } from "react-hook-form";

const Extras = () => {
  const {
    register,
    unregister,
    setValue,
    formState: { errors },
  } = useFormContext();

  const [billsIncludedSt, setBillsIncludedSt] = useState({
    yes: true,
    no: false,
  });

  const [amenityItems, setAmenityItems] = useState([
    { name: "Pets", checked: false },
    { name: "shared living Room", checked: false },
    { name: "Parking", checked: false },
    { name: "Disabled access", checked: false },
  ]);

  const handleCheckedChanged = (event, index) => {
    const checked = event.target.checked;
    if (!checked) {
      unregister(`amenities.${index}`);
    } else {
      register(`amenities.${index}`);
      setValue(`amenities.${index}`, event.target.value);
    }
    setAmenityItems((prevAmenityItems) =>
      prevAmenityItems.map((itm, idx) =>
        idx === index ? { ...itm, checked: !itm.checked } : itm
      )
    );
  };

  return (
    <div className="w-full details-text flxColStart gap-4">
      <div className="flxRowStart w-full">
        <label className="flex-1">Bills Included</label>
        <ul className="flxRowStart gap-2 flex-1">
          <li className="flxRowCenter gap-1">
            <label>Yes</label>
            <input
              {...register("billsIncluded")}
              value={billsIncludedSt.yes}
              type="radio"
            />
          </li>
          <li className="flxRowCenter gap-1">
            <label>No</label>
            <input
              {...register("billsIncluded")}
              value={billsIncludedSt.no}
              type="radio"
            />
          </li>
        </ul>
      </div>
      <div className="flxRowStart w-full">
        <div className="flex-1">
          Amenities
          {errors?.amenities && (
            <p className="form-error">{errors.amenities.message}</p>
          )}
        </div>
        <ul className="flex-1">
          {amenityItems.map((itm, index) => (
            <div className="flxRowCenter gap-1" key={itm.name}>
              <label>{itm.name}</label>
              <input
                onChange={(e) => {
                  handleCheckedChanged(e, index);
                }}
                value={itm.name}
                type="checkbox"
                checked={itm.checked}
              />
            </div>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Extras;
