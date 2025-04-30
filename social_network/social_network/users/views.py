from django.contrib.auth import get_user_model
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework.permissions import IsAuthenticated
from django.shortcuts import get_object_or_404
User = get_user_model()


class RegisterView(APIView):
    def post(self, request):
        username = request.data.get('username')
        password = request.data.get('password')
        email = request.data.get('email')
        if not username or not password or not email:
            return Response({'error': 'Пожалуйста, заполните все поля'}, status=status.HTTP_400_BAD_REQUEST)

        if User.objects.filter(username=username).exists():
            return Response({'error': 'Пользователь с таким именем уже существует'}, status=status.HTTP_400_BAD_REQUEST)

        if User.objects.filter(email=email).exists():
            return Response({'error': 'Пользователь с такой почтой уже существует'}, status=status.HTTP_400_BAD_REQUEST)

        user = User(username=username, email=email)
        user.set_password(password)
        user.save()
        refresh = RefreshToken.for_user(user)
        return Response({
            'message': 'Пользователь успешно зарегистрирован',
            'user': {
                    'id': user.id,
                    'username': user.username,
                    'email': user.email
                },
            'refresh': str(refresh),
            'access': str(refresh.access_token),
        }, status=status.HTTP_201_CREATED)


class LoginView(APIView):
    def post(self, request):
        email = request.data.get('email')
        password = request.data.get('password')
        if not password or not email:
            return Response({'error': 'Пожалуйста, заполните все поля'}, status=status.HTTP_400_BAD_REQUEST)
        
        
        user = User.objects.filter(email=email).first()
        if user is not None:
            refresh = RefreshToken.for_user(user)
            return Response({
                'message': 'Успешный вход',
                'user': {
                    'id': user.id,
                    'username': user.username,
                    'email': user.email
                },
                'refresh': str(refresh),
                'access': str(refresh.access_token),
            }, status=status.HTTP_200_OK)
        return Response({'error': 'Неверные данные'}, status=status.HTTP_401_UNAUTHORIZED)

class ProfileView(APIView):
    permission_classes = [IsAuthenticated]
    def get(self, request, id):
        user = get_object_or_404(User, id=id)
        return Response({
            'id': user.id,
            'username': user.username,
            'email': user.email
        }, status=status.HTTP_200_OK)