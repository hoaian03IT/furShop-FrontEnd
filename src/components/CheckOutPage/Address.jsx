import classNames from "classnames/bind";
import styles from "~/styles/Address.module.scss";
import { useEffect, useState } from "react";
import { getDistrict, getProvince, getVillage } from "~/api-server/GHN";

const cx = classNames.bind(styles);

function Address({ setAddressName, address, setAddress }) {
  const [province, setProvince] = useState([]);
  const [selectedProvinceClass, setSelectedProvinceClass] = useState("");
  const [selectedDictrictClass, setSelectedDictrictClass] = useState("");
  const [selectedVillageClass, setSelectedVillageClass] = useState("");
  const [district, setDistrict] = useState([]);
  const [village, setVillage] = useState([]);

  const handleChangeProvince = (e) => {
    const element = e.target.value.split(" ");
    const province = element[0] * 1;
    element.shift();
    setAddressName(element.join(" "));
    setAddress((props) => {
      return { ...props, province: province };
    });
    const selectedProvince = e.target;
    const selectedProvinceStyleClass = cx({
      selectedProvince: selectedProvince,
    });
    setSelectedProvinceClass(selectedProvinceStyleClass);
  };

  const handleChangeDistrict = (e) => {
    const element = e.target.value.split(" ");
    const district = element[0] * 1;
    element.shift();
    setAddressName((props) => {
      return element.join(" ") + " - " + props;
    });
    setAddress((props) => {
      return { ...props, district: district };
    });
    const selectedDictrict = e.target;
    const selectedDictrictStyleClass = cx({
      selectedDictrict: selectedDictrict,
    });
    setSelectedDictrictClass(selectedDictrictStyleClass);
  };

  const handleChangeVillage = (e) => {
    const element = e.target.value.split(" ");
    const village = element[0];
    element.shift();
    setAddressName((props) => {
      return element.join(" ") + " - " + props;
    });
    setAddress((props) => {
      return { ...props, village: village };
    });
    const selectedVillage = e.target;
    const selectedVillageStyleClass = cx({
      selectedVillage: selectedVillage,
    });
    setSelectedVillageClass(selectedVillageStyleClass);
  };

  useEffect(() => {
    (async () => {
      const dataProvince = await getProvince();
      setProvince(dataProvince);
      if (address?.province) {
        const dataDistrict = await getDistrict(address?.province);
        setDistrict(dataDistrict);

        if (address?.district) {
          const dataVillage = await getVillage(address?.district);
          setVillage(dataVillage);
        }
      }
    })();
  }, [JSON.stringify(address)]);
  return (
    <div className={cx("wrapper")}>
      <select
        className={cx("province", selectedProvinceClass)}
        onChange={handleChangeProvince}
      >
        <option>--Tỉnh thành--</option>
        {province.map((item, index) => {
          return (
            <option
              value={`${item.ProvinceID} ${item.NameExtension[1]}`}
              key={index}
            >
              {item.NameExtension[1]}
            </option>
          );
        })}
      </select>
      <select
        className={cx("district", selectedDictrictClass)}
        onChange={handleChangeDistrict}
        disabled={!address?.province}
      >
        <option>--Quận/Huyện--</option>
        {district.map((item, index) => {
          return (
            <option
              key={index}
              value={`${item.DistrictID} ${item.DistrictName}`}
            >
              {item.DistrictName}
            </option>
          );
        })}
      </select>
      <select
        className={cx("village", selectedVillageClass)}
        onChange={handleChangeVillage}
        disabled={!address?.district}
      >
        <option>--Phường/Xã--</option>
        {village.map((item, index) => {
          return (
            <option key={index} value={`${item.WardCode} ${item.WardName}`}>
              {item.WardName}
            </option>
          );
        })}
      </select>
    </div>
  );
}

export default Address;
