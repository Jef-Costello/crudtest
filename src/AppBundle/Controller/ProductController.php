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
use Doctrine\ORM\Query\ResultSetMapping;
use Doctrine\ORM\Query\ResultSetMappingBuilder;

class ProductController extends FOSRestController implements ClassResourceInterface
{
    public function testAction(Request $request)
    {

      //$product = new Product();
      $em = $this->getDoctrine()->getEntityManager();
        $rsm = new ResultSetMappingBuilder($em);
        $rsm->addRootEntityFromClassMetadata('AppBundle\Entity\Product', 'u');
        $rsm->addFieldResult('u', 'name', 'name');
        $rsm->addFieldResult('u', 'id', 'id');
        $rsm->addFieldResult('u', 'groups', 'groups');
        $rsm->addFieldResult('u', 'locations', 'locations');
    //.  $
    //  $rsm->addFieldResult('u', 'lng', 'lng');
      $rsm->addFieldResult('u', 'dist', 'distance');
        $query = $em->createNativeQuery('SELECT  e.name ,e.id,( 6371 * acos( cos( radians(52.101856) ) * cos( radians( lat ) ) * cos( radians( lng ) - radians(5.094162) ) + sin( radians(52.101856) ) * sin( radians( lat ) ) ) ) as dist FROM productslocations d INNER JOIN products e ON e.id = d.plID
      INNER JOIN location l ON l.id = d.jid
      ORDER BY dist', $rsm);
        $products= $query->getResult();
        foreach ($products as $p) {
            echo("<br>-------".$p->getName()."------- dist: ".$p->distance."<br>");
            foreach ($p->getGroups() as $g) {
                echo($g->getName());
            }
            foreach ($p->getLocations() as $l) {
                echo("<br>".$l->getAddress()."<br>");
            }
        }



        exit;
    }
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
        $em = $this->getDoctrine()->getEntityManager();

        $ptrepo = $em->getRepository("AppBundle:Producttype");
        $producttype=$request->query->get('Producttype');
        $pt=$ptrepo->findOneById($producttype);
        $product->setProducttype($pt);
        $repository = $em->getRepository("AppBundle:User");
        $user =  $this->get('security.token_storage')->getToken()->getUser();
        $product->setUser($user);
        $groups = $em->getRepository("AppBundle:Group");
        $locations = $em->getRepository("AppBundle:Location");
        $indx=1;

        foreach ($request->query->get('g') as $g) {
            if ($g=='true') {
                $group=$groups->findOneById($indx);
                $product->addGroup($group);
            }

            $indx++;
        }

        foreach ($request->query->get('l') as $indx=>$l) {
            if ($l=='true') {
                $location=$locations->findOneById($indx);
                $product->addLocation($location);
            }
        }

        $em->persist($product);
        $em->flush();
        $products=$user->getProducts();
        $jsonproducts=[];

        foreach ($products as $p) {
            $groupsjson=[];
            $grs=$p->getGroups();
            foreach ($grs as $g) {
                $groupsjson[]=['groupname'=>$g->getName(),'groupid'=>$g->getId()];
            }
            $locationsjson=[];
            $ls=$p->getLocations();
            foreach ($ls as $l) {
                $locationsjson[]=['name'=>$l->getName(),'id'=>$l->getId()];
            }
            $jsonproducts[]=["name"=> $p->getName(),"id"=>$p->getId(),"description"=>$p->getDescription(),'groups'=>$groupsjson,'locations'=>$locationsjson];
        }
        echo json_encode($jsonproducts);

        exit;
    }
    public function newptAction(Request $request)
    {
        if (!$this->get('security.authorization_checker')->isGranted('IS_AUTHENTICATED_FULLY')) {
            throw $this->createAccessDeniedException();
        }
        $producttype = new Producttype();

        $name=$request->query->get('name');
        $Description=$request->query->get('description');
        $product->setName($name);
        $product->setDescription($description);
        $product->setImageUrl($imageurl);
        $em = $this->getDoctrine()->getEntityManager();


        $em->persist($product);
        $em->flush();

  echo"added producttype";
        exit;
    }
    public function singleAction(Request $request)
    {
        if (!$this->get('security.authorization_checker')->isGranted('IS_AUTHENTICATED_FULLY')) {
            throw $this->createAccessDeniedException();
        }
        $ProductId=$request->query->get('ProductId');

        $em = $this->getDoctrine()->getEntityManager();
        $repository = $em->getRepository("AppBundle:Product");

        $p=$repository->findOneById($ProductId);


        echo json_encode(["name"=> $p->getName(),"id"=>$p->getId(),"description"=>$p->getDescription()]);

        exit;
    }

    public function getallAction(Request $request)
    {
        if (!$this->get('security.authorization_checker')->isGranted('IS_AUTHENTICATED_FULLY')) {
            throw $this->createAccessDeniedException();
        }

        $em = $this->getDoctrine()->getEntityManager();
        $repository = $em->getRepository("AppBundle:User");
        $user =  $this->get('security.token_storage')->getToken()->getUser();
        $products=$user->getProducts();
        $jsonproducts=[];
        foreach ($products as $p) {
            $groupsjson=[];
            $grs=$p->getGroups();
            foreach ($grs as $g) {
                $groupsjson[]=['groupname'=>$g->getName(),'groupid'=>$g->getId()];
            }
            $locationsjson=[];
            $ls=$p->getLocations();
            foreach ($ls as $l) {
                $locationsjson[]=['name'=>$l->getName(),'id'=>$l->getId()];
            }
            $jsonproducts[]=["name"=> $p->getName(),"id"=>$p->getId(),"description"=>$p->getDescription(),'groups'=>$groupsjson,'locations'=>$locationsjson];
        }
        echo json_encode($jsonproducts);

        exit;
    }
    public function getallpublicAction(Request $request)
    {
        $em = $this->getDoctrine()->getEntityManager();
        $repository = $em->getRepository("AppBundle:product");
       //$user =  $this->get('security.token_storage')->getToken()->getUser();
       $inLat=$request->query->get('lat');
       $inLng=$request->query->get('lng');
         $rsm = new ResultSetMappingBuilder($em);
         $rsm->addRootEntityFromClassMetadata('AppBundle\Entity\Product', 'u');
         $rsm->addFieldResult('u', 'name', 'name');
         $rsm->addFieldResult('u', 'description', 'description');
         $rsm->addFieldResult('u', 'id', 'id');
         $rsm->addMetaResult('u', 'lat', 'lat');
         $rsm->addMetaResult('u', 'lng', 'lng');
         $rsm->addFieldResult('u', 'groups', 'groups');
         $rsm->addFieldResult('u', 'locations', 'locations');
         $rsm->addMetaResult('u', 'producttype', 'producttype');
     //.  $
     //  $rsm->addFieldResult('u', 'lng', 'lng');
       $rsm->addFieldResult('u', 'distance', 'distance');
         $query = $em->createNativeQuery('SELECT  e.*,l.lat,l.lng,( 6371 * acos( cos( radians('.$inLat.') ) * cos( radians( lat ) ) * cos( radians( lng ) - radians('.$inLng.') ) + sin( radians('.$inLat.') ) * sin( radians( lat ) ) ) ) as distance FROM productslocations d INNER JOIN products e ON e.id = d.plID
       INNER JOIN location l ON l.id = d.jid
       ORDER BY distance', $rsm);
         $products= $query->getResult();
        $jsonproducts=[];
        foreach ($products as $p) {
            $groupsjson=[];
            $grs=$p->getGroups();
            $user=$p->getUser();
            $uid='none';
            $uname='';
            if ($user!=null) {
                $uid=$user->getId();
                $uname=$user->getName();
            }

            foreach ($grs as $g) {
                $groupsjson[]=['groupname'=>$g->getName(),'groupid'=>$g->getId()];
            }
            $locationsjson=[];
            $ls=$p->getLocations();
            foreach ($ls as $l) {
                $locationsjson[]=['name'=>$l->getName(),'id'=>$l->getId(),'type'=>$l->getType()];
            }
            if ($p->getProducttype()!=null){

              $ptype=$p->getProducttype()->getId();
              $par=$p->getProducttype()->getParent();//todo : should be determined in frontend.. normalized
              if( $par!=null )$ptparent=$p->getProducttype()->getParent()->getId();else $ptparent=null;
            }else $ptype=null;
            $jsonproducts[]=["name"=> $p->getName(),"id"=>$p->getId(),"description"=>$p->getDescription(),'groups'=>$groupsjson,'userid'=>$uid,'username'=>$uname,'ptype'=>$ptype,'ptparent'=>$ptparent,'distance'=>$p->getDistance(),'locations'=>$locationsjson];
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
            foreach ($grs as $g) {
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
        $em = $this->getDoctrine()->getEntityManager();
        $ptrepo = $em->getRepository("AppBundle:Producttype");
        $producttype=$request->query->get('ptype');
        $pt=$ptrepo->findOneById($producttype);
        //echo $pt->getName();exit;
        $repository = $em->getRepository("AppBundle:User");

        $user =  $this->get('security.token_storage')->getToken()->getUser();
        $product = $this->getDoctrine()
       ->getRepository('AppBundle:Product')
       ->find($productId);
        if ($product->getUser()==$user) {
            $product->setName($productName);
            $product->setDescription($productDescription);
            $product->setProducttype($pt);
            $groups = $em->getRepository("AppBundle:Group");
            $gid=[];
            $savedgroup= $product->getGroups();
            foreach ($savedgroup as $sg) {
                $gid[]=$sg->getId();//to do : find right method for this
            }
            $indx=1;
            foreach ($request->query->get('g') as $g) {
                if ($g=='true') {
                    $group=$groups->findOneById($indx);
                    if (!in_array($group->getId(), $gid)) {
                        $product->addGroup($group);
                    }
                }
                if ($g=='false') {
                    $group=$groups->findOneById($indx);
                    if (in_array($group->getId(), $gid)) {
                        $product->removeGroup($group);
                    }
                }
                $indx++;
            }
            $locations = $em->getRepository("AppBundle:Location");
            $locs=$locations->findBy(array('user'=>$user->getId()));
            $prodlocs=$product->getLocations();
            $prodl=[];
            foreach ($prodlocs as $pl) {
                $prodl[]=$pl->getId();
            }
            //$savedlocations= $product->getLocations();
            if ($request->query->get('l')!=null) {
                foreach ($locs as $sl) {
                    if (in_array($sl->getId(), $request->query->get('l'))) {
                        //$loc=$locations->findOneBy(array('user'=>$user->getId(),'id'=>$sl->getId()));
                  //  var_dump($loc->getName());exit;
                  if (!in_array($sl->getId(), $prodl)) {
                      $product->addLocation($locations->findOneById($sl->getId()));
                  }
                    } else {
                        $product->removeLocation($locations->findOneById($sl->getId()));
                    }
                }
            } else {
                foreach ($locs as $sl) {
                    $product->removeLocation($sl);
                }
            }




            $em->flush();
        } else {
            exit;
        }
        $products=$user->getProducts();
        $groupsjson=[];
        $grs=$product->getGroups();
        foreach ($grs as $g) {
            $groupsjson[]=['groupname'=>$g->getName(),'groupid'=>$g->getId()];
        }
        $jsonproducts=[];
        foreach ($products as $p) {
            $jsonproducts[]=["name"=> $p->getName(),"id"=>$p->getId()];
        }
        $locationsjson=[];
        $ls=$product->getLocations();
        foreach ($ls as $l) {
            $locationsjson[]=['name'=>$l->getName(),'id'=>$l->getId()];
        }
        echo json_encode(["name"=> $product->getName(),"id"=>$product->getId(),'description'=>$product->getDescription(),'groups'=>$groupsjson,'locations'=>$locationsjson,'ptype'=>$product->getProducttype()->getId()]);

        exit;
    }
    public function cgetAction(Request $request)
    {
        if (!$this->get('security.authorization_checker')->isGranted('IS_AUTHENTICATED_FULLY')) {
            throw $this->createAccessDeniedException();
        }
        if ($request->query->get('object')=='products') {
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
        $view = $this->view($products, 200)
            ->setTemplate("default/users.html.twig")
            ->setTemplateVar('users')
        ;
        return $this->handleView($view);
    }
}
