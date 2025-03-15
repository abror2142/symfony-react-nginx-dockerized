<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Attribute\Route;

final class ApiController extends AbstractController
{
    #[Route('/', name: 'app_api_home', methods: ['GET'])]
    public function index(): Response
    {
        return new JsonResponse(['message' => 'Use urls starting with /api to get the data from Symfony Backend! e.g. /api/welcome'], Response::HTTP_OK);
    }
    #[Route('/api/welcome', name: 'app_api_welcome', methods: ['GET'])]
    public function welcome(): Response
    {
        return new JsonResponse(['message' => 'Welcome to Symfony!'], Response::HTTP_OK);
    }
}
