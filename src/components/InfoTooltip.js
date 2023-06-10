import React from "react";


function InfoTooltip(){

  return(
    <div className="popup popup_opened popup_type_info">
      <div className="popup__container popup__container_type_info">
        <button className="popup__close-button popup__close-button_place_info" type="button" />
        <div className="popup__photo-info" />
        <p className="popup__copyright popup__copyright_place_info "> Вы успешно зарегестрировались!</p>
      </div>
    </div>
  )
}

export default InfoTooltip;
