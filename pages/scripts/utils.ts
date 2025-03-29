function persistToLocalStorage(key: string, data: any): void {
    if (typeof data === "string") {
      localStorage.setItem(key, data);
    } else {
      localStorage.setItem(key, JSON.stringify(data));
    }
  }
  
  function getValueFromLocalStorage(key: string): any {
    return localStorage.getItem(key);
  }