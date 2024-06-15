import 'dart:convert';

import 'package:http/http.dart' as http;


class TodoService {

  static Future<List?> fetchTodos() async {
    const url = 'http://127.0.0.1:8000/api-serial/';
    final uri = Uri.parse(url);
    final response = await http.get(uri);

    if (response.statusCode == 200) {
      final json = jsonDecode(response.body) as Map;
      final result = json['items'] as List;
      return result;
    } else {
      return null;
    }
  }

  static Future<bool> login({
    required String username,
    required String password,
  }) async {
    final response = await http.post(
      Uri.parse('http://127.0.0.1:8000/api-login/'),
      headers: <String, String>{
        'Content-Type': 'application/json',
      },
      body: jsonEncode({
        'username': username,
        'password': password,
      }),
    );

    return response.statusCode == 200;
  }

  static Future<bool> register({
    required String username,
    required String password,
    required String email,
  }) async {
    final response = await http.post(
      Uri.parse('http://127.0.0.1:8000/api-register/'),
      headers: <String, String>{
        'Content-Type': 'application/json',
      },
      body: jsonEncode({
        'username': username,
        'password': password,
        'email': email,
      }),
    );

    return response.statusCode == 201;
  }
}
