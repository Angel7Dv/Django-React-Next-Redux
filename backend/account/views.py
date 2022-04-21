from ast import Try
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import permissions, status

from django.contrib.auth.models import User
from .serializers import UserSerializer


class RegisterView(APIView):
    permission_classes = (permissions.AllowAny,)  # tuple

    def post(self, request):
        try:
            data = request.data
            # form data
            first_name = data['first_name']
            last_name = data['last_name']
            username = data['username']
            password = data['password']
            re_password = data['re_password']

            if password == re_password:
                if len(password) >= 8:                
                    if not User.objects.filter(username=username):
                        user = User.objects.create_user(
                            first_name=first_name,
                            last_name=last_name,
                            username=username,
                            password=password,
                        )
                        user.save()
                        if User.objects.filter(username=username).exists():
                            return Response(
                                {'success': "User created", },
                                status=status.HTTP_201_CREATED
                                )            
                        else:
                            return Response(
                                {'error': "Algo hiso algo que no fue el algo que querias", },
                                status=status.HTTP_500_INTERNAL_SERVER_ERROR
                            )
                    else:
                        return Response(
                            {'error': "User Name already exists" },
                            status=status.HTTP_400_BAD_REQUEST
                        )                
                else:
                    return Response(
                        {'error': "password  must be at least 8 characters in length", },
                        status=status.HTTP_400_BAD_REQUEST
                    )
            else:
                return Response(
                    {'error': "password do not match", },
                    status=status.HTTP_400_BAD_REQUEST
                )

        except:
            return Response(
                {'error': "error 505 algo no funciona correctamente 001",
                    "DATA": request.data},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )


class LoadUserView(APIView):
    queryset = User.objects.none() 

    def get(self, request, format=None):
        try:
            user = request.user
            print(request.user)
            user = UserSerializer(user)
            return Response(
                {'success': user.data},
                status=status.HTTP_200_OK
            )
        except:
            return Response(
                {'error': "error 505 algo no funciona correctamente", },
                status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )
