import { BACKEND_PORT } from '@/shared';

export interface UserLoginResponse {
  status: string;
  token: string | null;
}

export interface UserLoginResult {
  data: UserLoginResponse | null;
  error: string | null;
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: string;
  photo: string;
  verified: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface UserRegisterResult {
  status: string;
  data: User | null;
}

export interface UserInfoResult {
  status: string;
  data: {
    user: User | null;
  } | null;
}
export async function api_login(user_data: {
  email: string;
  password: string;
}): Promise<UserLoginResponse | undefined> {
  const response = await fetch(`${BACKEND_PORT}/api/auth/login`, {
    headers: { 'Content-Type': 'application/json' },
    method: 'POST',
    credentials: 'include',
    body: JSON.stringify(user_data),
  });

  if (response.ok) {
    let json = await response.json();
    return json;
  } else {
    console.warn('Ошибка HTTP: ' + response.status);
    return { status: `${response.status}`, token: null };
  }
}

export async function api_auth(user_data: {
  name: string;
  email: string;
  password: string;
}): Promise<UserRegisterResult | undefined> {
  const response = await fetch(`${BACKEND_PORT}/api/auth/register`, {
    headers: { 'Content-Type': 'application/json' },
    method: 'POST',
    credentials: 'include',
    body: JSON.stringify(user_data),
  });

  if (response.ok) {
    let json = await response.json();
    console.warn('json.data', json.data);
    return json.data;
  } else {
    let json = await response.json();
    console.warn('Ошибка HTTP: ' + json.status);
    return { status: `${json.status}`, data: null };
  }
}

export async function api_user_info(): Promise<UserInfoResult | undefined> {
  const response = await fetch(`${BACKEND_PORT}/api/users/me`, {
    headers: { 'Content-Type': 'application/json' },
    credentials: 'include',
    method: 'GET',
  });

  if (response.ok) {
    let json = await response.json();
    return json;
  } else {
    console.warn('Ошибка HTTP: ' + response.status);
    return { status: `${response.status}`, data: null };
  }
}

// pub async fn api_user_info() -> Result<User, String> {

// 	if response.status() != 200 {
// 		let error_response = response.json::<ErrorResponse>().await;
// 		return if let Ok(error_response) = error_response {
// 			Err(error_response.message)
// 		} else {
// 			Err(format!("Ошибка API: {}", response.status()))
// 		};
// 	}

// 	let res_json = response.json::<UserResponse>().await;
// 	match res_json {
// 		Ok(data) => Ok(data.data.user),
// 		Err(_) => Err("Не удалось прочитать ответ".to_string()),
// 	}
// }

// pub async fn api_logout_user() -> Result<(), String> {
// 	let response = match http::Request::get("http://localhost:8080/api/auth/logout")
// 		.credentials(http::RequestCredentials::Include)
// 		.send()
// 		.await
// 	{
// 		Ok(res) => res,
// 		Err(_) => return Err("Не удалось сделать запрос".to_string()),
// 	};

// 	if response.status() != 200 {
// 		let error_response = response.json::<ErrorResponse>().await;
// 		return if let Ok(error_response) = error_response {
// 			Err(error_response.message)
// 		} else {
// 			Err(format!("Ошибка API: {}", response.status()))
// 		};
// 	}

// 	Ok(())
// }
