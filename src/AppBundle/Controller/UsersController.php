<?php

namespace AppBundle\Controller;

use FOS\UserBundle\FOSUserEvents;
use FOS\UserBundle\Event\GetResponseUserEvent;
use FOS\UserBundle\Model\UserInterface;
use AppBundle\Entity\User;
use AppBundle\Entity\Product;
use AppBundle\Form\UserType;
use Symfony\Component\HttpFoundation\Request;
use FOS\RestBundle\Controller\FOSRestController;
use FOS\RestBundle\Routing\ClassResourceInterface;
use Symfony\Component\HttpFoundation\File\Exception\AccessDeniedException;

class UsersController extends FOSRestController implements ClassResourceInterface
{
    public function cgetAction(Request $request)
    {
        if (!$this->get('security.authorization_checker')->isGranted('IS_AUTHENTICATED_FULLY')) {
            throw $this->createAccessDeniedException();
        }
        if ($request->query->get('object')=='user') {
            $em = $this->getDoctrine()->getEntityManager();
            $repository = $em->getRepository("AppBundle:User");
            $users = $repository->findAll();


            $userId=$this->get('security.token_storage')->getToken()->getUser()->getId();
            $user = $this->getDoctrine()
        ->getRepository('AppBundle:User')
        ->find($userId);
            $products=$user->getProducts();
            $jsonproducts=[];

            foreach ($products as $p) {
                $jsonproducts[]=["name"=> $p->getName(),"id"=>$p->getId()];
            }
            echo json_encode($jsonproducts);

            exit;
        } else {
            echo json_encode(['error'=>'unknown object']);
            exit;
        }
        $view = $this->view($users, 200)
            ->setTemplate("default/users.html.twig")
            ->setTemplateVar('users')
        ;


        return $this->handleView($view);
    }
    public function loginAction(Request $request)
    {
        $name= $request->query->get('name');
        $password= $request->query->get('password');
        $opts = array(
  'http' => array('ignore_errors' => true)
);
        $context = stream_context_create($opts);
        $xml = file_get_contents("http://127.0.0.1/api4/web/app_dev.php/oauth/v2/token?client_id=2_t2n7w4jlr28w80wo84gook880cck4ccc4ws4ko0k04w00kgk4&client_secret=2ghw09zkf280gggsg8s48sc0owk4gsg48cwgcsgg84gkokw0cc&grant_type=password&username=".$name."&password=".$password, false, $context);
        if (!property_exists(json_decode($xml), 'error')) {
            echo json_encode(
       ['token'=>(json_decode($xml)->access_token)]);
            setcookie("httponlyrefresh", json_decode($xml)->refresh_token, null, null, null, null, true);

            exit;
        } else {
            throw $this->createAccessDeniedException();
            echo $xml;
            exit;
        }
       //store refresh token in httponly cookie
        echo  $this->client->getPublicId();
        exit;
    }
    public function logoutAction(Request $request)
    {
        setcookie("httponlyrefresh", '', null, null, null, null, true);
        exit;
    }
    public function refreshAction()
    {
        $opts = array(
  'http' => array('ignore_errors' => true)
);

        $context = stream_context_create($opts);
        if (array_key_exists("httponlyrefresh", $_COOKIE)) {
            $xml = file_get_contents("http://127.0.0.1/api4/web/app_dev.php/oauth/v2/token?grant_type=refresh_token&client_id=2_t2n7w4jlr28w80wo84gook880cck4ccc4ws4ko0k04w00kgk4&client_secret=2ghw09zkf280gggsg8s48sc0owk4gsg48cwgcsgg84gkokw0cc&refresh_token=".$_COOKIE["httponlyrefresh"], false, $context);
        } else {
            exit;
        }
        if (!property_exists(json_decode($xml), 'error')) {
            echo json_encode((json_decode($xml)->access_token));
            setcookie("httponlyrefresh", json_decode($xml)->refresh_token, null, null, null, null, true);
            exit;
        } else {
            echo $xml;
            exit;
        }
        echo  $this->client->getPublicId();
        exit;
    }

    public function userAction(Request $request)
    {
        if (!$this->get('security.authorization_checker')->isGranted('IS_AUTHENTICATED_FULLY')) {
            throw $this->createAccessDeniedException();
        }
        $em = $this->getDoctrine()->getEntityManager();
        $repository = $em->getRepository("AppBundle:User");
        $user =  $this->get('security.token_storage')->getToken()->getUser();
        $jsonproducts=[];
        echo json_encode(['name'=>$user->getUserName(),'email'=>$user->getEmail()]);
        exit;
    }

    public function apiAction(Request $request)
    {
        exit;

        $name= $request->query->get('name');
        $password= $request->query->get('password');

        $xml = file_get_contents("http://127.0.0.1/api4/web/app_dev.php/oauth/v2/token?client_id=1_1w4njs4ftwo0osccg08cswc4oc80wgc4kkksg8480o4c0g4c00&client_secret=3ohpora85s4k8oswco088o04s44k0kss8w0cskks4wk40gw4w8&grant_type=password&username=".$name."&password=".$password);
        var_dump($xml);
        exit;
        echo  $this->client->getPublicId();
        exit;
    }
    public function postAction(Request $request)
    {
        $userManager = $this->get('fos_user.user_manager');

        $user = $userManager->createUser();
        $user->setEnabled(true);

        $form = $this->createForm(UserType::class, $user);
        $form->handleRequest($request);

        if ($form->isValid()) {
            $user->setPlainPassword($user->getPassword());
            $userManager->updateUser($user);

            $view = $this->view($user, 200);
            return $this->handleView($view);
        }

        $view = $this->view($form->getErrors(), 409);
        return $this->handleView($view);
    }
}
