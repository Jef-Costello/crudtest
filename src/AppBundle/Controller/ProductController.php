<?php

namespace AppBundle\Controller;

use FOS\UserBundle\FOSUserEvents;
use FOS\UserBundle\Event\GetResponseUserEvent;
use FOS\UserBundle\Model\UserInterface;
use AppBundle\Entity\User;
use AppBundle\Entity\Product;
use AppBundle\Entity\Group;
use AppBundle\Form\UserType;
use Symfony\Component\HttpFoundation\Request;
use FOS\RestBundle\Controller\FOSRestController;
use FOS\RestBundle\Routing\ClassResourceInterface;
use Symfony\Component\HttpFoundation\File\Exception\AccessDeniedException;

class ProductController extends FOSRestController implements ClassResourceInterface
{
    public function newAction(Request $request)
    {
        if (!$this->get('security.authorization_checker')->isGranted('IS_AUTHENTICATED_FULLY')) {
            throw $this->createAccessDeniedException();
        }
        $product = new Product();

        $ProductName=$request->query->get('ProductName');
        $Description=$request->query->get('description');
        $product->setName($ProductName);
        $product->setDescription($Description);
      //  $em = $this->getDoctrine()->getManager();
        $em = $this->getDoctrine()->getEntityManager();
        $repository = $em->getRepository("AppBundle:User");
        $user =  $this->get('security.token_storage')->getToken()->getUser();
        $product->setUser($user);
        $groups = $em->getRepository("AppBundle:Group");
        $indx=1;

        foreach ($request->query->get('g') as $g ){
          if($g=='true'){
            $group=$groups->findOneById($indx);
            $product->addGroup($group);
  }

    $indx++;
  }


        /*$group = new Group();
        $group->setName('cat1');
        $em->persist($group);
        $group = new Group();
        $group->setName('cat2');
        $em->persist($group);
        $group = new Group();
        $group->setName('cat3');*/
        $em->persist($product);
        $em->flush();
        $products=$user->getProducts();
        $jsonproducts=[];

        foreach ($products as $p) {
          $groupsjson=[];
          $grs=$p->getGroups();
          foreach ($grs as $g){
            $groupsjson[]=['groupname'=>$g->getName(),'groupid'=>$g->getId()];
          }
            $jsonproducts[]=["name"=> $p->getName(),"id"=>$p->getId(),"description"=>$p->getDescription(),'groups'=>$groupsjson];
        }
        echo json_encode($jsonproducts);

        exit;
    }
    public function singleAction(Request $request)
    {
        if (!$this->get('security.authorization_checker')->isGranted('IS_AUTHENTICATED_FULLY')) {
            throw $this->createAccessDeniedException();
        }
      //  $product = new Product();
        $ProductId=$request->query->get('ProductId');
      //  $product->setName($ProductName);
      //  $em = $this->getDoctrine()->getManager();
        $em = $this->getDoctrine()->getEntityManager();
        $repository = $em->getRepository("AppBundle:Product");
      //  $user =  $this->get('security.token_storage')->getToken()->getUser();
      //  $product->setUser($user);
      //  $em->persist($product);


      //  $em->flush();
        //$repository->findOneById('1');
        //$jsonproducts=[];
$p=$repository->findOneById($ProductId);


        echo json_encode(["name"=> $p->getName(),"id"=>$p->getId(),"description"=>$p->getDescription()]);

        exit;
    }

    public function getallAction(Request $request)
    {
        if (!$this->get('security.authorization_checker')->isGranted('IS_AUTHENTICATED_FULLY')) {
            throw $this->createAccessDeniedException();
        }

      //  $em = $this->getDoctrine()->getManager();
        $em = $this->getDoctrine()->getEntityManager();
        $repository = $em->getRepository("AppBundle:User");
        $user =  $this->get('security.token_storage')->getToken()->getUser();
        $products=$user->getProducts();




        $jsonproducts=[];

        foreach ($products as $p) {
          $groupsjson=[];
          $grs=$p->getGroups();
          foreach ($grs as $g){
            $groupsjson[]=['groupname'=>$g->getName(),'groupid'=>$g->getId()];
          }
            $jsonproducts[]=["name"=> $p->getName(),"id"=>$p->getId(),"description"=>$p->getDescription(),'groups'=>$groupsjson];
        }
        echo json_encode($jsonproducts);

        exit;
    }
    public function productdeleteAction(Request $request)
    {
        if (!$this->get('security.authorization_checker')->isGranted('IS_AUTHENTICATED_FULLY')) {
            throw $this->createAccessDeniedException();
        }
        $productId=$request->query->get('productId');
      //  $em = $this->getDoctrine()->getManager();
        $em = $this->getDoctrine()->getEntityManager();
        $repository = $em->getRepository("AppBundle:User");
        $user =  $this->get('security.token_storage')->getToken()->getUser();

        $product = $this->getDoctrine()
       ->getRepository('AppBundle:Product')
       ->find($productId);
        if ($product->getUser()==$user) {
            $em->remove($product);
            $em->flush();
        }
        $products=$user->getProducts();



        $jsonproducts=[];

        foreach ($products as $p) {
          $groupsjson=[];
          $grs=$p->getGroups();
          foreach ($grs as $g){
            $groupsjson[]=['groupname'=>$g->getName(),'groupid'=>$g->getId()];
          }
            $jsonproducts[]=["name"=> $p->getName(),"id"=>$p->getId(),"description"=>$p->getDescription(),'groups'=>$groupsjson];
        }
        echo json_encode($jsonproducts);

        exit;
    }
    public function editproductAction(Request $request)
    {
        if (!$this->get('security.authorization_checker')->isGranted('IS_AUTHENTICATED_FULLY')) {
            throw $this->createAccessDeniedException();
        }
        $productId=$request->query->get('ProductId');
        $productName=$request->query->get('ProductName');
        $productDescription=$request->query->get('ProductDescription');
      //  $em = $this->getDoctrine()->getManager();
        $em = $this->getDoctrine()->getEntityManager();
        $repository = $em->getRepository("AppBundle:User");
        $user =  $this->get('security.token_storage')->getToken()->getUser();

        $product = $this->getDoctrine()
       ->getRepository('AppBundle:Product')
       ->find($productId);
        if ($product->getUser()==$user) {
            $product->setName($productName);
            $product->setDescription($productDescription);
            $groups = $em->getRepository("AppBundle:Group");
            $gid=[];
            $savedgroup= $product->getGroups();
            foreach($savedgroup as $sg){
              $gid[]=$sg->getId();//to do : find right method for this
            }
            //var_dump($gid);exit;
            $indx=1;

            foreach ($request->query->get('g') as $g ){
              if($g=='true'){

                $group=$groups->findOneById($indx);
                if( !in_array($group->getId(),$gid))
                $product->addGroup($group);
          }
          if($g=='false'){
          $group=$groups->findOneById($indx);
          if( in_array($group->getId(),$gid)){
          $product->removeGroup($group);}
          }

          $indx++;
          }



            $em->flush();
        }
        $products=$user->getProducts();
        $groupsjson=[];
        $grs=$product->getGroups();
        foreach ($grs as $g){
          $groupsjson[]=['groupname'=>$g->getName(),'groupid'=>$g->getId()];
        }


        $jsonproducts=[];

        foreach ($products as $p) {
            $jsonproducts[]=["name"=> $p->getName(),"id"=>$p->getId()];
        }
        echo json_encode(["name"=> $product->getName(),"id"=>$product->getId(),'description'=>$product->getDescription(),'groups'=>$groupsjson]);

        exit;
    }
    public function cgetAction(Request $request)
    {
        //security.yml is configured to allow anonymous access to controllers
        //checking for authorization in each controller allows more flexibility
        //to change this remove anonymous: true in security.yml on firewall
        if (!$this->get('security.authorization_checker')->isGranted('IS_AUTHENTICATED_FULLY')) {
            throw $this->createAccessDeniedException();
        }
        if ($request->query->get('object')=='products') {
            $em = $this->getDoctrine()->getEntityManager();
            $repository = $em->getRepository("AppBundle:User");
            $users = $repository->findAll();
//send email

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
        //foreach($user->getProducts() as $prod){var_dump($prod); };
        //echo json_encode(['name'=>$this->get('security.token_storage')->getToken()->getUser()->getName()]);


        exit;
        } else {
            echo json_encode(['error'=>'unknown object']);
            exit;
        }
        $view = $this->view($products, 200)
            ->setTemplate("default/users.html.twig")
            ->setTemplateVar('users')
        ;


        return $this->handleView($view);
    }
}
