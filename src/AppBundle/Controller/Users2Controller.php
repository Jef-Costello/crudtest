<?php

namespace AppBundle\Controller;
use FOS\UserBundle\FOSUserEvents;
use FOS\UserBundle\Event\GetResponseUserEvent;
use FOS\UserBundle\Model\UserInterface;
use AppBundle\Entity\User;
use AppBundle\Form\UserType;
use Symfony\Component\HttpFoundation\Request;
use FOS\RestBundle\Controller\FOSRestController;
use FOS\RestBundle\Routing\ClassResourceInterface;
use Symfony\Component\HttpFoundation\File\Exception\AccessDeniedException;

class Users2Controller extends FOSRestController implements ClassResourceInterface
{
    public function cgetAction()
    {
        //security.yml is configured to allow anonymous access to controllers
        //checking for authorization in each controller allows more flexibility
        //to change this remove anonymous: true in security.yml on firewall
        if (!$this->get('security.authorization_checker')->isGranted('IS_AUTHENTICATED_FULLY')) {
            throw $this->createAccessDeniedException();
        }

        $em = $this->getDoctrine()->getEntityManager();
        $repository = $em->getRepository("AppBundle:User");
        $users = $repository->findAll();
//send email
        echo "welcome ".$this->get('security.token_storage')->getToken()->getUser()->getUserName();exit;
        $view = $this->view($users, 200)
            ->setTemplate("default/users.html.twig")
            ->setTemplateVar('users')
        ;


        return $this->handleView($view);
    }
public function testAction(Request $request)
    {
    			//validate email
    		$name= $request->query->get('name');
			$password= $request->query->get('password');
    	
       $xml = file_get_contents("http://127.0.0.1/api4/web/app_dev.php/oauth/v2/token?client_id=1_1w4njs4ftwo0osccg08cswc4oc80wgc4kkksg8480o4c0g4c00&client_secret=3ohpora85s4k8oswco088o04s44k0kss8w0cskks4wk40gw4w8&grant_type=password&username=".$name."&password=".$password);
       var_dump($xml);exit;
	    echo  $this->client->getPublicId();exit;
    }
    public function postAction(Request $request){

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
