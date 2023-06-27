import DateTimePicker from "@react-native-community/datetimepicker";
import { DateTime } from "luxon";
import { useState } from "react";
import { Image, Platform, TouchableOpacity } from "react-native";
import LgsTextInput from "./lgsTextInput";

const LgsDatePicker = ({ value, onChange }) => {
  const [show, setShow] = useState(false);
  const [date, setDate] = useState(new Date(value));

  const onChangeDate = (_, selectedDate) => {
    const datet = DateTime.fromJSDate(selectedDate).toFormat("yyyy/MM/dd");
    console.log("hihi", datet);
    setShow(false);
    onChange(datet);
    // setDate(currentDate);
    console.log("date");
  };

  return (
    <>
      {Platform.OS === "android" && (
        <>
          <LgsTextInput
            placeholder="yyyy/mm/dd"
            style={{ flex: 1, justifyContent: "flex-start" }}
            onChangeText={onChange}
            value={value}
          />
          <TouchableOpacity
            style={{
              flex: 0.5,
              // backgroundColor: "red",
              justifyContent: "center",
              alignItems: "center",
              height: 50,
              width: 50,
            }}
            onPress={() => setShow(!show)}
          >
            <Image
              source={require("../assets/dateIcon.png")}
              style={{ height: 33, width: 30 }}
            />
          </TouchableOpacity>
          {show && (
            <DateTimePicker
              style={{
                flex: 1,
                display: "flex",
                height: Platform.OS === "ios" ? 50 : undefined,
                marginRight: 15,
                // width: "100%",
                // backgroundColor: "red",

                // margin: "auto",
                // width: 300,
              }}
              // locale="es-ES"
              testID="dateTimePicker"
              value={date}
              mode={"date"}
              is24Hour={true}
              onChange={onChangeDate}
              // display={"default"}
            />
          )}
        </>
      )}
      {Platform.OS === "ios" && (
        <DateTimePicker
          value={value}
          mode="date"
          onChange={(_, date) => {
            console.log(date);
            onChange(date);
          }}
        />
      )}
    </>
  );
};

export default LgsDatePicker;
