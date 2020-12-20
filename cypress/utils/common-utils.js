/// <reference types="cypress" />

export const getTime = (durationStr) => {
    let strTime = durationStr.split(':');
    let duration = new Date();
    if(strTime.length == 3) {
        duration.setHours(Number(strTime[0]), Number(strTime[1]), Number(strTime[2]));
    } else if (strTime.length == 2) {
        duration.setHours(0, Number(strTime[0]),Number(strTime[1]));
    } else {
        throw `Something wrong with the format of duration ${durationStr}`;
    }
    return duration;
}

export const getAbbreciatedViews = (views) => {
    const commaCount = views.match(/,/g).length;
    switch(commaCount) {
      case 1:
      return `${views.split(',')[0]}K views`;
      case 2:
      return `${views.split(',')[0]}M views`;
      default:
      return views;
    }
  }
