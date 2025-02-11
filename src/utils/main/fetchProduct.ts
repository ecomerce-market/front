// utils/fetchProducts.ts
export const fetchWeekendProducts = async () => {
  try {
    const response = await fetch(
      "http://localhost:3001/api/v1/products/weekend-deals"
    );

    if (!response.ok) {
      throw new Error("상품을 불러오는 데 실패했습니다.");
    }

    const data = await response.json();
    return data.products; // 서버에서 반환된 데이터의 `products` 배열만 반환
  } catch (error: any) {
    throw new Error("상품리스트 404 에러");
  }
};

export const fetchNewProducts = async () => {
  try {
    const response = await fetch(
      "http://localhost:3001/api/v1/products/new-products"
    );

    if (!response.ok) {
      throw new Error("상품을 불러오는 데 실패했습니다.");
    }

    const data = await response.json();
    return data.products; // 서버에서 반환된 데이터의 `products` 배열만 반환
  } catch (error: any) {
    throw new Error("상품리스트 404 에러");
  }
};

export const getRandomProducts = (array: any[], n: number) => {
  const shuffled = [...array].sort(() => 0.5 - Math.random()); // 배열을 랜덤으로 섞음
  return shuffled.slice(0, n); // 랜덤으로 섞인 배열에서 첫 n개의 아이템을 반환
};
